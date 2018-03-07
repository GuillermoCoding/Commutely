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
						searchedJob: {
								title
						}
				}
				cache.writeData({data});
				const state = cache.readQuery({query});
				return data;
			}
		}
	}
	
};
export default searchedJob;
        