import React from 'react';
import JobLoader from './JobLoader';
import { withApollo } from 'react-apollo';

class SearchJobsButton extends React.Component {
  onLoad(){
    console.log('SearchJobButton onLoad');

  }
  render(){
    return (
    <JobLoader
      onLoad={this.onLoad}
      startingindex={0}
      render={({getButtonProps})=>{
        return (
          <button {...getButtonProps}/>
        );
      }}
    />
  );
  }


}

export default SearchJobsButton;