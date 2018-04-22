import { combineReducers } from 'redux';
import jobReducer from './job_reducer';

const rootReducer = combineReducers({
  jobs: jobReducer,
});
export default rootReducer;
