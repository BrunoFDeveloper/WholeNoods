import {
	BeforeInsert,
	Entity,
	ManyToOne,
	RelationId,
	Unique,
} from 'typeorm';
import { ExternalEntity } from './BaseEntity';
import { User, UserType } from './User';

// TODO: We could make Subscription EXTEND the follow.
@Entity()
@Unique(['fromUser', 'toUser'])
export class Follow extends ExternalEntity {
	@ManyToOne(() => User, (user) => user.following)
	fromUser!: User;

	@RelationId('fromUser')
	fromUserId!: string;

	@ManyToOne(() => User, (user) => user.followers)
	toUser!: User;

	@RelationId('toUser')
	toUserId!: string;

	@BeforeInsert()
	async sanityCheck() {
		if (this.fromUser.id === this.toUser.id) {
			throw new Error('You cannot follow yourself');
		}

		// TODO: Figure out if we want this:
		// if (this.toUser.type !== UserType.CREATOR) {
		// 	throw new Error('You can only follow content creators');
		// }
	}
}
