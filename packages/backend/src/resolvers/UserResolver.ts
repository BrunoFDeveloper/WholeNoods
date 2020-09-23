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
import { User, UserType } from '../entities/User';
import { AuthorizedContext } from '../types';
import CurrentUserOnly from '../utils/CurrentUserOnly';

@Resolver(() => User)
export class UserResolver {
	@Authorized()
	@Query(() => User)
	user(@Arg('id', () => ID) id: string) {
		return User.findOneOrFail(id);
	}

	@Authorized()
	@FieldResolver(() => Boolean)
	isCurrentlySubscribed(
		@Root() rootUser: User,
		@Ctx() { user }: AuthorizedContext,
	) {
		return user.canViewPosts(rootUser);
	}

	@Authorized()
	@CurrentUserOnly()
	@FieldResolver(() => String)
	legalName(@Root() user: User) {
		return user.legalName;
	}

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
