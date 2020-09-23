import {
	Arg,
	Authorized,
	Ctx,
	FieldResolver,
	ForbiddenError,
	ID,
	Int,
	Mutation,
	Query,
	Resolver,
	Root,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { AuthorizedContext } from '../types';

@Resolver(() => User)
export class UserResolver {
	@Authorized()
	@Query(() => User)
	user(@Arg('username') username: string) {
		return User.findOneOrFail({
			where: {
				username,
			},
		});
	}

	@Authorized()
	@FieldResolver(() => Boolean)
	isCurrentlySubscribed(
		@Root() rootUser: User,
		@Ctx() { user }: AuthorizedContext,
	) {
		return user.canViewPosts(rootUser);
	}

	// TODO: Implement this better.
	@Authorized()
	@FieldResolver(() => [Post])
	async posts(@Root() rootUser: User, @Ctx() { user }: AuthorizedContext) {
		if (!(await user.canViewPosts(rootUser))) {
			return [];
		}

		return rootUser.posts;
	}

	@FieldResolver(() => Int)
	postsCount(@Root() user: User) {
		return user.getPostsCount();
	}

	@FieldResolver(() => Int)
	subscribersCount(@Root() user: User) {
		return user.getSubscribersCount();
	}

	@Authorized()
	@Mutation(() => User)
	async applyToCreator(@Ctx() { user }: AuthorizedContext) {
		await user.applyToCreator();

		return user;

		// user.type = UserType.CREATOR;
		// await user.save();

		// return user;
	}
}
