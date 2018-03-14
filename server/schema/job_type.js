const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = require('graphql');

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
        routeAvailable: { type: GraphQLBoolean}
	})
});

module.exports = JobType;