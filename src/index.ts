import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-express";
import * as express from "express";

// import { typeDefs, resolvers } from "./schema";

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

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
