import { FETCH_JOBS } from '../actions';
export default function(state=[],action){
	switch (action.type) {
		case FETCH_JOBS:
			return [...state];
	}
	return state;
}