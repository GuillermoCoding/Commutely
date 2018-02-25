const { GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const JobType = new GraphQLObjectType({
	name: 'JobType',
	fields: () => ({
		_id : { type: GraphQLID},
		jobTitle: { type: GraphQLString}
	})
});

module.exports = JobType;