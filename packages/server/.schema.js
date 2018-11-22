const { makeExecutableSchema } = require("graphql-tools");
const { loadResolversFiles, loadSchemaFiles } = require("@graphql-modules/sonar");
const { mergeGraphQLSchemas, mergeResolvers } = require("@graphql-modules/epoxy");

module.exports = makeExecutableSchema({
  typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/src/modules/")),
  resolvers: mergeResolvers(loadResolversFiles(__dirname + "/src/modules/"))
});
