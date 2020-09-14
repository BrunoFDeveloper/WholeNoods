import { Ctx, FieldResolver, Resolver, Root } from "type-graphql";
import { Post } from "../entities/Post";
import { User } from "../entities/User";
import { Context } from "../types";

@Resolver(() => User)
export class UserResolver {
  @FieldResolver(() => [Post])
  posts(@Root() rootUser: User, @Ctx() { user }: Context) {

  }
}
