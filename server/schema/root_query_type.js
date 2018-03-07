const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql');
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
				zipcode: {type: GraphQLString}
			},
			resolve(parentVale, {title, zipcode}){
				const jobResults = fetchData.IndeedJobs(title,zipcode);
				return jobResults;
			}
		}
	})
});

module.exports = RootQuery;