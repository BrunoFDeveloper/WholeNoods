import { createMethodDecorator, ForbiddenError } from "type-graphql";
import { User } from "../entities/User";
import { Context } from "../types";

export default function CurrentUserOnly() {
  return createMethodDecorator<Context>(async ({ root, context }, next) => {
    if ((root as User).id !== context.user?.id) {
      throw new ForbiddenError();
    }

    return next();
  });
}
