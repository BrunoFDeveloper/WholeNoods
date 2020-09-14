import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { AuthResolver } from "./resolvers/AuthResolver";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import { Context } from "./types";
import { HomeResolver } from "./resolvers/HomeResolver";
import { UserResolver } from "./resolvers/UserResolver";

async function main() {
  await createConnection(require("../ormconfig.json"));

  const schema = await buildSchema({
    resolvers: [AuthResolver, HomeResolver, UserResolver],
    emitSchemaFile: true,
  });

  new ApolloServer({
    schema,
    async context({ req }): Promise<Context> {
      const [, jwtHeader] = req.get("authorization")?.split("Bearer ") ?? [];

      if (jwtHeader) {
        return {
          user: await User.fromJWT(jwtHeader),
        };
      }

      return {};
    },
  }).listen(4000, () => {
    console.log("Apollo server running on port 4000.");
  });
}

main();
