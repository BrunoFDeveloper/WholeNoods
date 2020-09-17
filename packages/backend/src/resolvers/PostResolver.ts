import {
  ID,
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
  FieldResolver,
  Int,
  Root,
} from "type-graphql";
import { Favorite } from "../entities/Favorite";
import { Post, PostVisibility } from "../entities/Post";
import { AuthorizedContext } from "../types";

@InputType()
class CreatePostInput {
  @Field() title!: string;
  @Field() text!: string;
  @Field(() => PostVisibility) visibility!: PostVisibility;
}

@InputType()
class PinPostInput {
  @Field(() => ID) id!: number;
}

@InputType()
class FavoritePostInput {
  @Field(() => ID) id!: number;
}

// TODO: Favoriting a post allows users to bypass the security guard on posts.
// We should fix this.

@Resolver(() => Post)
export class PostResolver {
  @Authorized()
  @Mutation(() => Post)
  async favoritePost(
    @Arg("input") input: FavoritePostInput,
    @Ctx() { user }: AuthorizedContext
  ) {
    const post = await Post.findOneOrFail(input.id);

    const favorite = Favorite.create({
      user,
      post,
    });

    await favorite.save();

    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  async pinPost(
    @Arg("input") input: PinPostInput,
    @Ctx() { user }: AuthorizedContext
  ) {
    const post = await Post.findOneOrFail({
      where: {
        id: input.id,
        user,
      },
    });

    user.pinnedPost = post;
    await user.save();

    return post;
  }

  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() { user }: AuthorizedContext
  ) {
    const post = Post.create({
      title: input.title,
      text: input.text,
      visibility: input.visibility,
      user,
    });

    return await post.save();
  }

  @FieldResolver(() => Int)
  favoritesCount(@Root() post: Post) {
    return post.getFavoritesCount();
  }
}
