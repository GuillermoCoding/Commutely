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
        console.log(previousJobs);
        console.log(previousJobs.push(jobs));
        const data = {
          jobList: {
            __typename: 'jobList',
            jobs: previousJobs.concat([jobs])
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
        