import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { authenticator } from "otplib";
import SecurePassword from "secure-password";
import { Post } from "./Post";
import { Lazy, Session } from "../types";
import { Subscription } from "./Subscription";
import { ExternalEntity } from "./BaseEntity";
import { Favorite } from "./Favorite";

const securePassword = new SecurePassword();

export enum UserType {
  VIEWER,
  CREATOR,
}

export enum AuthType {
  FULL = "FULL",
  TOTP = "TOTP",
  PASSWORD_RESET = "PASSWORD_RESET",
}

registerEnumType(UserType, {
  name: "UserType",
});

@Entity()
@ObjectType()
export class User extends ExternalEntity {
  static async fromSession(
    session: Session | null,
    allowedType: AuthType = AuthType.FULL
  ): Promise<User | undefined> {
    if (session && session.userID && session.type === allowedType) {
      return await this.findOne(session.userID);
    }

    return;
  }

  static async fromTOTPSession(session: Session, token: string): Promise<User> {
    if (!session.userID || session.type !== AuthType.TOTP) {
      throw new Error("No TOTP session currently exists.");
    }

    const user = await this.findOne(session.userID);
    if (!user || !user.totpSecret) {
      throw new Error("No user was found in the current session.");
    }

    const isValid = authenticator.verify({ secret: user.totpSecret, token });
    if (!isValid) {
      throw new Error("The TOTP token provided was not valid.");
    }

    return user;
  }

  @Field()
  @Column({ unique: true, collation: "nocase" })
  email!: string;

  @Column()
  legalName!: string;

  @Field()
  @Column()
  displayName!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field(() => UserType)
  @Column({ default: UserType.VIEWER })
  type!: UserType;

  @Column({ type: "blob" })
  passwordHash!: Buffer;

  // TODO: Encrypt this somehow?
  @Column("varchar", { nullable: true })
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

  getSubscribersCount() {
    return Subscription.count({
      where: { toUser: this }
    })
  }

  getPostsCount() {
    return Post.count({
      where: {
        user: this,
      },
    });
  }

  @OneToMany(() => Subscription, (subscription) => subscription.fromUser, {
    lazy: true,
  })
  subscriptions!: Lazy<Subscription[]>;

  async setPassword(password: string) {
    this.passwordHash = await securePassword.hash(Buffer.from(password));
  }

  async verifyPassword(password: string) {
    const result = await securePassword.verify(
      Buffer.from(password),
      this.passwordHash
    );

    // The hash params used for the stored hash have since changed, so we should re-hash the password
    // to ensure that it is as secure as possible:
    if (result === SecurePassword.VALID_NEEDS_REHASH) {
      await this.setPassword(password);
      await this.save();
    }

    return [SecurePassword.VALID, SecurePassword.VALID_NEEDS_REHASH].includes(
      result
    );
  }

  async signIn(session: Session, type: AuthType = AuthType.FULL) {
    session.userID = this.id;
    session.type = type;
  }

  async canViewPosts(otherUser: User) {
    if (otherUser.id === this.id) {
      return true;
    }

    const subscription = await Subscription.findOne({
      fromUser: this,
      toUser: otherUser,
    });

    return !!subscription;
  }
}
