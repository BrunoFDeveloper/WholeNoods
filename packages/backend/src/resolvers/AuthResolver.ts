import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { AuthType, User } from "../entities/User";
import { Context } from "../types";
import Result from "./types/Result";

@ObjectType()
class SignInResult extends Result {
  @Field() requiresTOTP: boolean;

  constructor(requiresTOTP: boolean) {
    super();
    this.requiresTOTP = requiresTOTP;
  }
}

@Resolver()
export class AuthResolver {
  @Query(() => User, { nullable: true })
  viewer(@Ctx() { user }: Context) {
    return user;
  }

  @Mutation(() => Result)
  async signUp(
    @Arg("name") name: string,
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = User.create({
      email,
      legalName: name,
      displayName: name,
    });

    await user.setPassword(password);
    await user.save();

    user.signIn();

    return new Result();
  }

  @Mutation(() => SignInResult)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    const user = await User.findOneOrFail({
      where: {
        email,
      },
    });

    const passwordValid = await user.verifyPassword(password);

    if (!passwordValid) {
      throw new Error("Invalid password.");
    }

    if (user.totpSecret) {
      await user.signIn(AuthType.TOTP);

      return new SignInResult(true);
    }

    await user.signIn();

    return new SignInResult(false);
  }
}
