import { combineReducers } from 'redux';
import JobReducer from './job_reducer';

const rootReducer = combineReducers({
    jobs : JobReducer
});

export default rootReducer;