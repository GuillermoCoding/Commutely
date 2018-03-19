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
				homeAddress: {type: GraphQLString},
				city: {type: GraphQLString},
				state: {type: GraphQLString},
				commuteSelected: {type: GraphQLString},
				timeSelected: {type: GraphQLInt},
				startingPage: {type: GraphQLInt},
			},
			resolve(parentVale, args){
				// const jobResults = [{
				// 	title: 'title1',
				// 	company: 'company1',
				// 	address: '13025 Worldgate Dr, Herndon',
				// 	commuteTime: '1',
				// 	commuteDistance: '1',
				// 	url : 'url1'
				// },
				// {
				// 	title: 'title2',
				// 	company: 'company2',
				// 	address: '13025 Worldgate Dr, Herndon',
				// 	commuteTime: '2',
				// 	commuteDistance: '2',
				// 	url : 'url2'

				// },
				// {
				// 	title: 'title3',
				// 	company: 'company3',
				// 	address: '13025 Worldgate Dr, Herndon',
				// 	commuteTime: '3',
				// 	commuteDistance: '3',
				// 	url : 'url3'
				// },
				// {
				// 	title: 'title4',
				// 	company: 'company4',
				// 	address: '13025 Worldgate Dr, Herndon',
				// 	commuteTime: '4',
				// 	commuteDistance: '4',
				// 	url : 'url4'
				// }];
				const jobResults = fetchData.IndeedJobs(args);
				return jobResults;
			}
		}
	})
});

module.exports = RootQuery;