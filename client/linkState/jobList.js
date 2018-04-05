import gql from 'graphql-tag';
import { fetchJobList} from '../queries';

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
        const response = cache.readQuery({query: fetchJobList});
        const previousJobs = response.jobList.jobs;
        const data = {
          jobList: {
            __typename: 'jobList',
            jobs: previousJobs.concat(jobs)
          }
        };
        cache.writeData({ data });
        return null;
      },
      updateStartingIndex: (_,{index},{cache})=>{
        const data = {
          joblist: {
            index: 0
          }
        };
        cache.writeData({data});
      },
      resetJobList: (__,variables,{cache})=>{

        cache.writeData({data:{jobList:{jobs:[]}}});
      }
    }
  }
};

export default jobList;
        