const { GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const JobType = new GraphQLObjectType({
	name: 'JobType',
	fields: () => ({
		_id : { type: GraphQLID},
		title: { type: GraphQLString},
        company: { type: GraphQLString},
        city: { type: GraphQLString},
        state: { type: GraphQLString},
        country: { type: GraphQLString},
        url: { type: GraphQLString},
	})
});

module.exports = JobType;