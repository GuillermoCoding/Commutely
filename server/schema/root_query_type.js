const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');
const SuggestionType = require('./suggestion_type');
const JobType = require('./job_type');
const suggestionModel = require('../models/suggestion');
const Suggestion = mongoose.model('suggestion');

const fetchData = require('../controllers/fetchData');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: ()=>({
		suggestions : {
			type: new GraphQLList(SuggestionType),
			args: {
				title : {type: GraphQLString}
			},
			resolve(parentValue, {title}){
				const suggestionResults = Suggestion.find({title: {$regex : '^'+title, $options: 'i'}}).limit(10).exec();
				return suggestionResults;
			}
		},
		jobs: {
			type: new GraphQLList(JobType),
			args : {
				title: {type: GraphQLString},
				zipcode: {type: GraphQLString},
				startingPage: {type: GraphQLInt},
				lat: {type: GraphQLInt},
				lng: {type: GraphQLInt},
				commuteSelected: {type: GraphQLString},
				timeSelected: {type: GraphQLInt}
			},
			resolve(parentVale, args){
				
				console.log('fetch jobs');
				const jobResults = fetchData.IndeedJobs(args);
				return jobResults;
			}
		}
	})
});

module.exports = RootQuery;