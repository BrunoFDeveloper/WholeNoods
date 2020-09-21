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
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Favorite } from "../entities/Favorite";
import { Post, PostVisibility } from "../entities/Post";
import { PostMedia, PostMediaType } from "../entities/PostMedia";
import { AuthorizedContext } from "../types";
import { upload } from "../utils/upload";

@InputType()
class CreatePostInput {
  @Field() title!: string;
  @Field() text!: string;
  @Field(() => PostVisibility) visibility!: PostVisibility;
  @Field(() => [GraphQLUpload]) media!: Promise<FileUpload>[];
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

    const existingFavorite = await Favorite.findOne({
      where: {
        user,
        post,
      },
    });

    if (existingFavorite) {
      await Favorite.remove(existingFavorite);
    } else {
      const favorite = Favorite.create({
        user,
        post,
      });

      await favorite.save();
    }

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
    const media = await Promise.all(input.media);

    // TODO: Make upload take an array:
    const uploadedAssets = await Promise.all(
      media.map((individualMedia) => upload(individualMedia))
    );

    console.log(uploadedAssets);

    const post = Post.create({
      title: input.title,
      text: input.text,
      visibility: input.visibility,
      user,
    });

    await post.save();

    const postMedia = PostMedia.create({
      post,
      url:
        "https://cultureatz.com/wp-content/uploads/2009/10/hot_food_laid_d.jpg",
      type: PostMediaType.PHOTO,
    });

    await postMedia.save();

    return post;
  }

  @FieldResolver(() => Int)
  async favoritesCount(@Root() post: Post) {
    return post.getFavoritesCount();
  }

  @Authorized()
  @FieldResolver(() => Boolean)
  hasFavorited(@Root() post: Post, @Ctx() { user }: AuthorizedContext) {
    return post.hasFavorited(user);
  }
}
