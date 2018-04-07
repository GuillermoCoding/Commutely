import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import { 
  fetchJobs, 
  fetchSearchedJob, 
  fetchAddress, 
  fetchCommuteOption, 
  fetchJobResults,

} from '../queries';
import { JobLoader } from '../components';

import { updateJobResults } from '../mutations';
import Loader from 'react-loader-spinner';
import styles from '../styles/LoadMoreButton.css';

class LoadMoreButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      startingIndex: 10
    }
  }
  async onLoad(jobs){
    if (jobs.length==0) {
      this.props.updateErrorMessage({
        variables: {
          content: 'No more jobs to load'
        }
      });
    } else {
      await this.props.updateJobResults({
        variables: {
          jobs
        }
      });
    }
    await this.setState((prevState)=>{
      return {startingIndex: prevState.startingIndex + 10}
    });
  }
  render(){
    return (
      <JobLoader
        onLoad={this.onLoad.bind(this)}
        startingIndex={this.state.startingIndex}
        render={({getButtonProps,isLoading})=>{
          return (
            <button
              {...getButtonProps}
              disabled={isLoading}
              className={styles.button} 
            >
            <div>
              {isLoading?(
                  <Loader
                    type='ThreeDots'
                    color="#ffffff"
                    height="35"	
                    width="35"
                  />
              ):  <p className={styles.text}>
                    Load more
                  </p>
              }
              </div>
            </button>
          );
        }}
      />
    );
  }
}

export default compose(
  graphql(updateJobResults,{
    name: 'updateJobResults'
  })
)(LoadMoreButton);