import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";

import { createTypeormConnection } from "./createTypeormConnection";
import { createSchema } from "./createSchema";

// TODO: move to .env
const SESSION_SECRET = "alskfjkdmskmv";
const RedisStore = connectRedis(session);

const startServer = async () => {
  await createTypeormConnection();

  const app = express();

  app.use();

  const server = new ApolloServer({
    schema: createSchema()
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
