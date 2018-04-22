const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');

const JobType = new GraphQLObjectType({
  name: 'JobType',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    company: { type: GraphQLString },
    address: { type: GraphQLString },
    commuteTime: { type: GraphQLString },
    commuteDistance: { type: GraphQLString },
    snippet: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});
module.exports = JobType;
