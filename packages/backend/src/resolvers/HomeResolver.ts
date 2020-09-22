import {
  Authorized,
  Ctx,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { In } from "typeorm";
import { Post } from "../entities/Post";
import { Subscription } from "../entities/Subscription";
import { AuthorizedContext } from "../types";

@ObjectType()
class HomePage {
  @Field(() => [Post])
  posts!: Post[];
}

@Resolver()
export class HomeResolver {
  @Authorized()
  @Query(() => HomePage)
  async home(@Ctx() { user }: AuthorizedContext) {
    const usersForTimeline = await Subscription.find({
      where: {
        fromUser: user,
      },
    });

    const posts = await Post.find({
      where: {
        user: In([...usersForTimeline.map((sub) => sub.toUserId), user.id]),
      },
      // For the home feed, we know what relations to load:
      relations: ["user", "media"],
    });

    return {
      posts,
    };
  }
}
