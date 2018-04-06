import _ from 'lodash';
import address from './address';
import jobResults from './jobResults';
import searchedJob from './searchedJob';
import commuteOption from './commuteOption';
import errorMessage from './errorMessage';

export default _.merge(
  address,
  jobResults,
  searchedJob,
  commuteOption,
  errorMessage
)