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
import { In } from 'typeorm';
import { Post, PostVisibility } from '../entities/Post';
import { User, UserType } from '../entities/User';
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
		return user.isSubscribedTo(rootUser);
	}

	@Authorized()
	@FieldResolver(() => Boolean)
	isFollowing(@Root() rootUser: User, @Ctx() { user }: AuthorizedContext) {
		return user.isFollowing(rootUser);
	}

	@Authorized()
	@FieldResolver(() => Boolean)
	isViewer(@Root() root: User, @Ctx() { user }: AuthorizedContext) {
		return root.id === user.id;
	}

	@Authorized()
	@FieldResolver(() => [Post])
	async posts(@Root() root: User, @Ctx() { user }: AuthorizedContext) {
		// Only creators can post, so save us some time:
		if (!root.isCreator()) {
			return [];
		}

		const subscribed = await user.isSubscribedTo(root);

		const posts = await Post.find({
			where: {
				user: root,
				visibility: subscribed
					? In([
							PostVisibility.PUBLIC,
							PostVisibility.PRIVATE,
							PostVisibility.PRIVATE_PREVIEW,
					  ])
					: In([PostVisibility.PUBLIC, PostVisibility.PRIVATE_PREVIEW]),
			},
		});

		return posts;
	}

	@FieldResolver(() => Int)
	postsCount(@Root() root: User) {
		if (!root.isCreator()) {
			return 0;
		}

		return root.getPostsCount();
	}

	@FieldResolver(() => Int)
	subscribersCount(@Root() root: User) {
		if (!root.isCreator()) {
			return 0;
		}

		return root.getSubscribersCount();
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
