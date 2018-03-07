import axios from 'axios';

export const FETCH_JOBS = 'FETCH_JOBS';

export function fetchJobs(jobTitle){
	console.log("action creator : "+jobTitle);
	//axios.get('http://api.indeed.com/ads/apisearch?publisher=964453866194441&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&format=json&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2')
	
	return function(dispatch){
		axios.get('http://api.indeed.com/ads/apisearch?publisher=964453866194441&q=java&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&format=json&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2')
			.then(function(res){
				console.log('response'+res);
				dispatch({
					type: FETCH_JOBS,
					payload: ''
				});
			})
			.catch(function(err){
				console.log('error : '+err);
			});
	}
}