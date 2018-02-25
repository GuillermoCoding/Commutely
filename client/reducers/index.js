import { combineReducers } from 'redux';
import JobReducer from './job_reducer';

const rootReducer = combineReducers({
    job : JobReducer
});

export default rootReducer;