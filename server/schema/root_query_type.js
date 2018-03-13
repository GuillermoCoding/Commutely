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
				console.log(suggestionResults);
				return suggestionResults;
			}
		},
		jobs: {
			type: new GraphQLList(JobType),
			args : {
				title: {type: GraphQLString},
				zipcode: {type: GraphQLString},
				startingPage: {type: GraphQLInt}
			},
			resolve(parentVale, {title, zipcode, startingPage}){
				const jobResults = fetchData.IndeedJobs(title,zipcode,startingPage);
				return jobResults;
			}
		}
	})
});

module.exports = RootQuery;