import { Field, ObjectType, registerEnumType } from 'type-graphql';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
} from 'typeorm';
import { authenticator } from 'otplib';
import SecurePassword from 'secure-password';
import { Post } from './Post';
import { KoaContext, Lazy } from '../types';
import { Subscription } from './Subscription';
import { Follow } from './Follow';
import { ExternalEntity } from './BaseEntity';
import { Favorite } from './Favorite';
import { getCurrentRequest } from '../utils/currentRequest';
import { MessageThreadParticipant } from './MessageThreadParticipant';
import { ApplicationStatus, CreatorApplication } from './CreatorApplication';
import { CreatorInformation } from './CreatorInformation';
import { MAX_CREATOR_APPLICATIONS } from '../config';

const securePassword = new SecurePassword();

export enum UserType {
	VIEWER,
	CREATOR,
}

export enum AuthType {
	FULL = 'FULL',
	TOTP = 'TOTP',
	PASSWORD_RESET = 'PASSWORD_RESET',
}

registerEnumType(UserType, {
	name: 'UserType',
});

@Entity()
@ObjectType()
export class User extends ExternalEntity {
	static async fromSession(
		// NOTE: We can't use getCurrentRequest becase this is accessed outside of it.
		ctx: KoaContext,
		allowedType: AuthType = AuthType.FULL,
	): Promise<User | undefined> {
		if (ctx.session && ctx.session.userID && ctx.session.type === allowedType) {
			return await this.findOne(ctx.session.userID);
		}

		return;
	}

	static async fromTOTPSession(token: string): Promise<User> {
		const { ctx } = getCurrentRequest();

		if (
			!ctx.session ||
			!ctx.session.userID ||
			ctx.session.type !== AuthType.TOTP
		) {
			throw new Error('No TOTP session currently exists.');
		}

		const user = await this.findOne(ctx.session.userID);
		if (!user || !user.totpSecret) {
			throw new Error('No user was found in the current session.');
		}

		const isValid = authenticator.verify({ secret: user.totpSecret, token });
		if (!isValid) {
			throw new Error('The TOTP token provided was not valid.');
		}

		return user;
	}

	@Field()
	@Column('citext', { unique: true })
	email!: string;

	@Column({ nullable: true })
	avatarUrl?: string;

	@Field()
	@Column()
	name!: string;

	@Field()
	@Column('citext', { unique: true })
	username!: string;

	@Field()
	@Column({ default: '' })
	bio!: string;

	@Field()
	@Column({ default: '' })
	location!: string;

	@Field(() => UserType)
	@Column({ default: UserType.VIEWER })
	type!: UserType;

	@OneToMany(() => CreatorApplication, (application) => application.user, {
		lazy: true,
	})
	applications!: Lazy<CreatorApplication[]>;

	@OneToOne(() => CreatorInformation)
	creatorInformation?: CreatorInformation;

	@Column({ type: 'bytea' })
	passwordHash!: Buffer;

	// TODO: Encrypt this somehow?
	@Column('varchar', { nullable: true })
	totpSecret?: string | null;

	generateTotpSecret() {
		return authenticator.generateSecret();
	}

	@OneToMany(() => Favorite, (favorite) => favorite.user, { lazy: true })
	favorites!: Lazy<Favorite[]>;

	@OneToMany(() => Post, (post) => post.user, { lazy: true })
	posts!: Lazy<Post[]>;

	@Field(() => Post, { nullable: true })
	@JoinColumn()
	@OneToOne(() => Post, { nullable: true, lazy: true })
	pinnedPost?: Lazy<Post>;

	@OneToMany(() => Subscription, (subscription) => subscription.toUser, {
		lazy: true,
	})
	subscribers!: Lazy<Subscription[]>;

	@OneToMany(() => Subscription, (subscription) => subscription.fromUser, {
		lazy: true,
	})
	subscriptions!: Lazy<Subscription[]>;

	@OneToMany(() => Follow, (follow) => follow.toUser, {
		lazy: true,
	})
	followers!: Lazy<Follow[]>;

	@OneToMany(() => Follow, (follow) => follow.fromUser, {
		lazy: true,
	})
	following!: Lazy<Follow[]>;

	getSubscribersCount() {
		return Subscription.count({
			where: { toUser: this },
		});
	}

	getPostsCount() {
		return Post.count({
			where: {
				user: this,
			},
		});
	}

	@OneToMany(() => MessageThreadParticipant, (thread) => thread.user, {
		lazy: true,
	})
	threads!: Lazy<MessageThreadParticipant[]>;

	async setPassword(password: string) {
		this.passwordHash = await securePassword.hash(Buffer.from(password));
	}

	async verifyPassword(password: string) {
		const result = await securePassword.verify(
			Buffer.from(password),
			this.passwordHash,
		);

		// The hash params used for the stored hash have since changed, so we should re-hash the password
		// to ensure that it is as secure as possible:
		if (result === SecurePassword.VALID_NEEDS_REHASH) {
			await this.setPassword(password);
			await this.save();
		}

		return [SecurePassword.VALID, SecurePassword.VALID_NEEDS_REHASH].includes(
			result,
		);
	}

	async signIn(type: AuthType = AuthType.FULL) {
		const { ctx } = getCurrentRequest();
		ctx.session.userID = this.id;
		ctx.session.type = type;
	}

	@Field(() => Boolean)
	isCreator() {
		console.log(this);
		return this.type === UserType.CREATOR;
	}

	async followOrUnfollow(otherUser: User) {
		const existingFollow = await Follow.findOne({
			fromUser: this,
			toUser: otherUser,
		});

		if (existingFollow) {
			await Follow.remove(existingFollow);
			return existingFollow;
		}
		console.log('CREATING');

		return await Follow.create({
			fromUser: this,
			toUser: otherUser,
		}).save();
	}

	async isFollowing(otherUser: User) {
		const existingFollow = await Follow.findOne({
			fromUser: this,
			toUser: otherUser,
		});

		console.log(existingFollow);

		return !!existingFollow;
	}

	private subscribedCache = new WeakMap<User, boolean>();
	async isSubscribedTo(otherUser: User) {
		if (otherUser.id === this.id) {
			return true;
		}

		if (!otherUser.isCreator()) {
			return false;
		}

		if (this.subscribedCache.has(otherUser)) {
			return this.subscribedCache.get(otherUser);
		}

		const isSubscribed = !!(await Subscription.findOne({
			fromUser: this,
			toUser: otherUser,
		}));

		this.subscribedCache.set(otherUser, isSubscribed);

		return isSubscribed;
	}

	async applyToCreator() {
		if (this.isCreator()) {
			throw new Error('You are already a creator');
		}

		const applicationsCount = await CreatorApplication.count({
			where: {
				user: this,
			},
		});

		if (applicationsCount > MAX_CREATOR_APPLICATIONS) {
			throw new Error(
				'You have exceeded the maximum amount of applications. Please contact support if you would like to apply again.',
			);
		}

		const pendingApplication = await CreatorApplication.findOne({
			where: {
				user: this,
				status: ApplicationStatus.PENDING,
			},
		});

		if (pendingApplication) {
			throw new Error('You already have a pending application.');
		}

		return await CreatorApplication.create({
			user: this,
		}).save();

		// TODO: Create an application.
	}
}
