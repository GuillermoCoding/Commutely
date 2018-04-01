import gql from 'graphql-tag';

const jobList = { 
  defaults: {
    jobList: {
      __typename: 'jobList',
      jobs: [],
      index: 0
    }
  },
  resolvers: {
    Mutation : {
      updateJobList : (_,{jobs},{cache})=>{
        console.log('updateJoblist with:');
        console.log(jobs);
        const data = {
          jobList: {
            __typename: 'jobList',
            jobs
          }
        };
        cache.writeData({ data });
        return null;
      },
      updateStartingIndex: (_,{index},{cache})=>{
        console.log('updateStartingIndex with : '+index);
        const data = {
          joblist: {
            index: 0
          }
        };
        cache.writeData({data});
      }
    }
  }
};

export default jobList;
        