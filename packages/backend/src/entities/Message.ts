import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './utils/Base';
import { MessageThread } from './MessageThread';
import { User } from './User';

@Entity()
@ObjectType()
export class Message extends ExternalEntity {
	@ManyToOne(() => MessageThread, (thread) => thread.messages, { lazy: true })
	thread!: Lazy<MessageThread>;

	@Field(() => User)
	@ManyToOne(() => User, { lazy: true })
	user!: Lazy<User>;

	@RelationId((message: Message) => message.user)
	userId!: string;

	@Field()
	@Column()
	text!: string;
}
