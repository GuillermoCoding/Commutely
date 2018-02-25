import axios from 'axios';

export const FETCH_JOBS = 'FETCH_JOBS';
export function fetchJobs(jobTitle){
	return {
		type: FETCH_JOBS,
		payload: ''
	}
}