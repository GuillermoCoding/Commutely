import query from '../queries/fetchSearchedJob';

const searchedJob = { 
	defaults: {
		searchedJob: {
			__typename : 'searchedJob',
			title: ''
		}
	},
	resolvers: {
		Mutation : {
			updateSearchedJob : (_,{title},{cache}) => {
				const data = {
					searchedJob : {
						__typename: 'searchedJob',
						title
					}
				}
				cache.writeData({data});
				return null;
			}
		}
	}
	
};
export default searchedJob;
        