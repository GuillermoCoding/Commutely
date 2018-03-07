
import fetchJobList from '../queries/fetchJobList';

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
						  jobs
					  }
				  };
				  cache.writeData({ data });
			}
		}
	}
	
};
export default jobList;
        