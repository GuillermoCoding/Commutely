const { GraphQLObjectType, GraphQLString, GraphQLID} = require('graphql');

const SuggestionType = new GraphQLObjectType({
	name: 'SuggestionType',
	fields: () => ({
		_id : { type: GraphQLID},
		title: { type: GraphQLString}
	})
});

module.exports = SuggestionType;