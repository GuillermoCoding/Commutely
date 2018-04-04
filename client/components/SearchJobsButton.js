import React from 'react';
import JobLoader from './JobLoader';

const SearchJobsButton = ()=>{
  
  return (
    <JobLoader
      startingindex={0}
      render={({getButtonProps})=>{
        return (
          <button {...getButtonProps}/>
        );
      }}
    />
  );
};

export default SearchJobsButton;