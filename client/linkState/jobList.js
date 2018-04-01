import gql from 'graphql-tag';

const jobList = { 
  defaults: {
    jobList: {
      __typename: 'jobList',
      jobs: [],
      startingIndex: 0
    }
  },
  resolvers: {
    Mutation : {
      updateJobList : (_,{jobs},{cache})=>{
        const query = gql`query{
          jobList @client{
            startingIndex
          }
        }`;
        const result = cache.readQuery({query});
        const previousIndex = result.jobList.startingIndex;
        const data = {
          jobList: {
            __typename: 'jobList',
            jobs,
            startingIndex: (previousIndex + 10)
          }
        };
        cache.writeData({ data });
        return null;
      },
      updateStartingIndex: (_,{startingIndex},{cache})=>{
        const data = {
          joblist: {
            startingIndex: 0
          }
        };
        cache.writeData({data});
      }
    }
  }
};

export default jobList;
        