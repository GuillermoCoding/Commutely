const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');

const JobCriteriaType = new GraphQLObjectType({
	name: 'JobCriteriaType',
	fields: () => ({
		title: { type: GraphQLString},
        zipcode: { type: GraphQLString},
        lat: { type: GraphQLInt},
        lng: { type: GraphQLInt},
        commuteOption: { type: GraphQLString},
		timeOption: { type: GraphQLInt},
		startingPage : { type: GraphQLInt},
	})
});

module.exports = JobCriteriaType;