import { Field, ObjectType } from 'type-graphql';
import { TypeormLoader } from 'type-graphql-dataloader';
import { Entity, ManyToOne, RelationId, Unique } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './utils/Base';
import { MessageThread } from './MessageThread';
import { User } from './User';

@ObjectType()
@Entity()
@Unique(['thread', 'user'])
export class MessageThreadParticipant extends ExternalEntity {
	@Field(() => MessageThread)
	@ManyToOne(() => MessageThread, (thread) => thread.participants, { lazy: true })
	@TypeormLoader(
		() => MessageThreadParticipant,
		(participant: MessageThreadParticipant) => participant.threadId,
	)
	thread!: Lazy<MessageThread>;

	@RelationId((participant: MessageThreadParticipant) => participant.thread)
	threadId!: string;

	@Field(() => User)
	@ManyToOne(() => User, (user) => user.threads, { lazy: true })
	@TypeormLoader(
		() => MessageThreadParticipant,
		(participant: MessageThreadParticipant) => participant.userId,
	)
	user!: Lazy<User>;

	@RelationId((participant: MessageThreadParticipant) => participant.user)
	userId!: string;
}
