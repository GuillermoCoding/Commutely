
const jobList = { 
  defaults: {
    jobList: {
      __typename: 'jobList',
      jobs: []
    }
  },
  resolvers: {
    Mutation : {
      updateJobList : (_,{jobs},{cache})=>{
        const data = {
          jobList: {
            __typename: 'jobList',
            jobs
          }
        };
        cache.writeData({ data });
        return null;
      }
    }
  }
};

export default jobList;
        