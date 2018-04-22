const mongoose = require('mongoose');
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const SuggestionType = require('./suggestion_type');
const JobType = require('./job_type');
const suggestionModel = require('../models/suggestion');
const Suggestion = mongoose.model('suggestion');

const fetchData = require('../controllers/fetchData');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    locationSuggestions: {
      type: new GraphQLList(GraphQLString),
      args: {
        input: { type: GraphQLString },
      },
      resolve(parentValue, { input }) {
        const suggestions = fetchData.Locations(input);
        return suggestions;
      },
    },
    jobTitleSuggestions: {
      type: new GraphQLList(GraphQLString),
      args: {
        input: { type: GraphQLString },
      },
      resolve(parentValue, { input }) {
        const suggestions = fetchData.JobTitles(input);
        return suggestions;
      },
    },
    jobs: {
      type: new GraphQLList(JobType),
      args: {
        title: { type: GraphQLString },
        homeAddress: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        commuteSelected: { type: GraphQLString },
        timeSelected: { type: GraphQLInt },
        startingIndex: { type: GraphQLInt },
      },
      resolve(parentVale, args) {
        const jobResults = fetchData.IndeedJobs(args);
        return jobResults;
      },
    },
  }),
});

module.exports = RootQuery;
