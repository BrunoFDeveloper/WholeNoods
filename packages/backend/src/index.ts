import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import session from "koa-session";
import depthLimit from "graphql-depth-limit";
import {
  simpleEstimator,
  getComplexity,
  fieldExtensionsEstimator,
} from "graphql-query-complexity";
import { ApolloServer } from "apollo-server-koa";
import { AuthChecker, buildSchema } from "type-graphql";
import { createConnection, getConnection } from "typeorm";
import { AuthResolver } from "./resolvers/AuthResolver";
import { User } from "./entities/User";
import { Context, KoaContext, Session } from "./types";
import { HomeResolver } from "./resolvers/HomeResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { SubscriptionResolver } from "./resolvers/SubscriptionResolver";
import { PostResolver } from "./resolvers/PostResolver";
import { ApolloServerLoaderPlugin } from "type-graphql-dataloader";
import { run } from "./utils/currentRequest";

const COOKIE_NAME = "wholenoods.cookie";
const COOKIE_SECRET = "replace-before-prod";
const MAX_COMPLEXITY = 20;

async function main() {
  await createConnection(require("../ormconfig.js"));

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

  const app = new Koa();

  app.keys = [COOKIE_SECRET];

  const SESSION_CONFIG = {
    key: COOKIE_NAME,
    maxAge: 86400000 * 14,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true,
    renew: false,
  };

  app.use(async (ctx: KoaContext, next) => {
    ctx.context = {
      ctx,
      user: await User.fromSession(ctx),
    };

    await run(ctx.context, next);
  });

  app.use(session(SESSION_CONFIG, app));
  app.use(bodyParser());

  const server = new ApolloServer({
    schema,
    debug: true,
    uploads: true,
    plugins: [
      // @ts-ignore: There's a type mis-match here:
      ApolloServerLoaderPlugin({
        typeormGetConnection: getConnection,
      }),
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 1 }),
              ],
            });

            if (complexity > MAX_COMPLEXITY) {
              throw new Error(`GraphQL query was too complex.`);
            }

            console.log("Used query complexity points:", complexity);
          },
        }),
      },
    ],
    async context({ ctx }): Promise<Context> {
      return ctx.context;
    },
    validationRules: [depthLimit(6)],
  });

  server.applyMiddleware({ app, path: "/api/graphql" });

  app.listen(4000, () => {
    console.log("Apollo server running on port 4000.");
  });
}

main();
