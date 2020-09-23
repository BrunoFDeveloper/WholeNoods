import {
	Authorized,
	Ctx,
	FieldResolver,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Message } from '../entities/Message';
import { MessageThread } from '../entities/MessageThread';
import { MessageThreadParticipant } from '../entities/MessageThreadParticipant';
import { AuthorizedContext } from '../types';

@Resolver(() => MessageThread)
export class MessageThreadResolver {
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
