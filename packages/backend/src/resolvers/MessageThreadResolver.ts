import {
	Arg,
	Authorized,
	Ctx,
	Field,
	FieldResolver,
	ID,
	InputType,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Message } from '../entities/Message';
import { MessageThread } from '../entities/MessageThread';
import { MessageThreadParticipant } from '../entities/MessageThreadParticipant';
import { AuthorizedContext } from '../types';

@InputType()
class SendMessageInput {
	@Field(() => ID) messageThreadId!: string;
	@Field() text!: string;
}

@Resolver(() => MessageThread)
export class MessageThreadResolver {
	@Authorized()
	@Mutation(() => Message)
	async sendMessage(
		@Arg('input') input: SendMessageInput,
		@Ctx() { user }: AuthorizedContext,
	) {
		const thread = { id: input.messageThreadId };
		const participant = await MessageThreadParticipant.findOneOrFail({
			where: {
				user,
				thread,
			},
		});

		const message = Message.create({
			thread,
			user,
			text: input.text,
		});

		return await message.save();
	}

	@Authorized()
	@Query(() => [MessageThread])
	async messageThreads(@Ctx() { user }: AuthorizedContext) {
		const threadParticipants = await MessageThreadParticipant.find({
			where: {
				user,
			},
			relations: ['thread'],
		});

		return threadParticipants.map(({ thread }) => thread);
	}

	@Authorized()
	@Query(() => MessageThread)
	async messageThread(
		@Arg('id', () => ID) id: string,
		@Ctx() { user }: AuthorizedContext,
	) {
		const threadParticipant = await MessageThreadParticipant.findOneOrFail({
			where: {
				user,
				thread: { id },
			},
		});

		return await MessageThread.findOneOrFail(threadParticipant.threadId, {
			relations: ['messages', 'participants'],
		});
	}

	@FieldResolver(() => Message, { nullable: true })
	lastMessage(@Root() thread: MessageThread) {
		return Message.findOne({
			where: {
				thread,
			},
			order: {
				createdAt: 'DESC',
			},
		});
	}
}
