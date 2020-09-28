import {
	BaseEntity,
	BeforeInsert,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	RelationId,
	Unique,
} from 'typeorm';
import { User, UserType } from './User';

@Entity()
@Unique(['fromUser', 'toUser'])
export class Subscription extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@ManyToOne(() => User, (user) => user.subscriptions)
	fromUser!: User;

	@RelationId((sub: Subscription) => sub.fromUser)
	fromUserId!: string;

	@ManyToOne(() => User, (user) => user.subscribers)
	toUser!: User;

	@RelationId((sub: Subscription) => sub.toUser)
	toUserId!: string;

	@BeforeInsert()
	async sanityCheck() {
		if (this.fromUser.id === this.toUser.id) {
			throw new Error('You cannot subscribe to yourself');
		}

		if (!this.toUser.isCreator()) {
			throw new Error('You can only subscribe to content creators');
		}
	}
}
