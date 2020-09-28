import {
	Arg,
	Authorized,
	Ctx,
	Field,
	ID,
	InputType,
	Mutation,
	Resolver,
} from 'type-graphql';
import { User } from '../entities/User';
import { AuthorizedContext } from '../types';

@InputType()
class FollowInput {
	@Field(() => ID) userId!: string;
}

@Resolver()
export class FollowResolver {
	@Authorized()
	@Mutation(() => User)
	async follow(
		@Arg('input') input: FollowInput,
		@Ctx() { user }: AuthorizedContext,
	) {
		const toUser = await User.findOneOrFail(input.userId);
		await user.followOrUnfollow(toUser);
		return toUser;
	}
}
