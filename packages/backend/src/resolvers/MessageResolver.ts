import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Message } from '../entities/Message';
import { AuthorizedContext } from '../types';

@Resolver(() => Message)
export class MessageResolver {
	@FieldResolver(() => Boolean)
	fromViewer(@Root() message: Message, @Ctx() { user }: AuthorizedContext) {
		return message.userId === user.id;
	}
}
