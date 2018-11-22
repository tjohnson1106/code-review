import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as cors from "cors";
import * as connectRedis from "connect-redis";
import { redis } from "./redis";

import { createTypeormConnection } from "./createTypeormConnection";
import { createSchema } from "./createSchema";

// TODO: move to .env
const SESSION_SECRET = "alskfjkdmskmv";
const RedisStore = connectRedis(session);

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000"
};

const startServer = async () => {
  await createTypeormConnection();

  const app = express();

  app.use(cors(corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // years
      }
    })
  );

  const server = new ApolloServer({
    schema: createSchema(),
    context: ({ req }) => ({
      req
    })
  });

  server.applyMiddleware({
    app,
    cors: false
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
