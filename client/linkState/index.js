import _ from 'lodash';
import address from './address';
import jobList from './joblist';
import searchedJob from './searchedJob';
import commuteOption from './commuteOption';
import errorMessage from './errorMessage';

export default _.merge(
  address,
  jobList,
  searchedJob,
  commuteOption,
  errorMessage
)