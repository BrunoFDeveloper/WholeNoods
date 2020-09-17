import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { ApolloServer } from "apollo-server-express";
import { AuthChecker, buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Context, Session } from "./types";
import { HomeResolver } from "./resolvers/HomeResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { SubscriptionResolver } from "./resolvers/SubscriptionResolver";
import { PostResolver } from "./resolvers/PostResolver";

const COOKIE_SECRET = "replace-before-prod";

async function main() {
  await createConnection(require("../ormconfig.json"));

  const authChecker: AuthChecker<Context> = (
    { root, args, context, info },
    roles
  ) => {
    if (context.user) {
      return true;
    }
    return false;
  };

  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      HomeResolver,
      UserResolver,
      SubscriptionResolver,
      PostResolver,
    ],
    emitSchemaFile: true,
    authChecker,
  });

  const app = express();

  app.use(bodyParser.json());
  app.use(
    cookieSession({
      name: "wholenoods.cookie",
      keys: [COOKIE_SECRET],
    })
  );

  const server = new ApolloServer({
    schema,
    async context({ req }): Promise<Context> {
      return {
        req,
        user: await User.fromSession(req.session as Session),
      };
    },
  });

  server.applyMiddleware({
    app,
    cors: {
      origin: true,
      credentials: true,
    },
  });

  app.listen(4000, () => {
    console.log("Apollo server running on port 4000.");
  });
}

main();
