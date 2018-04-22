const { GraphQLSchema } = require('graphql');
const RootQueryType = require('./root_query_type');

const graphqQLSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = graphqQLSchema;
