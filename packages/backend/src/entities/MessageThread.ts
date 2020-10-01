import { Field, ObjectType } from 'type-graphql';
import { Entity, OneToMany } from 'typeorm';
import { Lazy } from '../types';
import { ExternalEntity } from './utils/Base';
import { Message } from './Message';
import { MessageThreadParticipant } from './MessageThreadParticipant';

@ObjectType()
@Entity()
export class MessageThread extends ExternalEntity {
	@Field(() => [MessageThreadParticipant])
	@OneToMany(() => MessageThreadParticipant, (participant) => participant.thread, { lazy: true })
	participants!: Lazy<MessageThreadParticipant[]>;

	@Field(() => [Message])
	@OneToMany(() => Message, (message) => message.thread, { lazy: true })
	messages!: Lazy<Message[]>;
}
