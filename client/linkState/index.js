// export {default as address } from './address';
// export {default as jobList } from './jobList';
// export {default as searchedJob } from './searchedJob';
// export {default as commuteOption } from './commuteOption';
// export {default as timeOption } from './timeOption';
// export {default as errorMessage } from './errorMessage';
import _ from 'lodash';
import address from './address';
import jobList from './joblist';
import searchedJob from './searchedJob';
import commuteOption from './commuteOption';
import timeOption from './timeOption';
import errorMessage from './errorMessage';
console.log('index');
console.log(_.merge(address,jobList,searchedJob,commuteOption,timeOption,errorMessage));


export default _.merge(address,jobList,searchedJob,commuteOption,timeOption,errorMessage)
    // address,
    // jobList,
    // searchedJob,
    // commuteOption,
    // timeOption,
    // errorMessage
