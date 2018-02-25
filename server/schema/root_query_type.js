const mongoose = require('mongoose');
const { GraphQLObjectType, GraphQLList, GraphQLString} = require('graphql');
const JobType = require('./job_type');
const jobModel = require('../models/job'); 
const Job = mongoose.model('job');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: ()=>({
		jobs : {
			type: new GraphQLList(JobType),
			args: {
				jobPhrase : {type: GraphQLString}
			},
			resolve(parentValue, {jobPhrase}){
				console.log('jobs resolver');
				const jobResults = Job.find({jobTitle: {$regex : '^'+jobPhrase, $options: 'i'}}).limit(10).exec();
				return jobResults;
			}
		}

	})
});

module.exports = RootQuery;