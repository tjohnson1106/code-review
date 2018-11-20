import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";

import { createTypeormConnection } from "./createTypeormConnection";
import { createSchema } from "./createSchema";

// import { typeDefs, resolvers } from "./schema";

const startServer = async () => {
  await createTypeormConnection();

  const app = express();

  const server = new ApolloServer({
    schema: createSchema()
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
