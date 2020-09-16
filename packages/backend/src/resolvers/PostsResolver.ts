import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { Post } from "../entities/Post";
import { AuthorizedContext } from "../types";

@InputType()
class CreatePostInput {
  @Field() title!: string;
  @Field() text!: string;
}

@Resolver()
export class PostsResolver {
  @Authorized()
  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: CreatePostInput,
    @Ctx() { user }: AuthorizedContext
  ) {
    const post = Post.create({
      title: input.title,
      text: input.text,
      user,
    });

    return await post.save();
  }
}
