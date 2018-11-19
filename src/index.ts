import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";

import { createTypeormConnection } from "./createTypeormConnection";

// import { typeDefs, resolvers } from "./schema";

const startServer = async () => {
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => "test"
    }
  };

  await createTypeormConnection();

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
