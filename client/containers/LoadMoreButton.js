import React from 'react';
import styles from '../styles/LoadMoreButton.css';
import { withApollo, compose } from 'react-apollo';
import { 
  fetchJobs, 
  fetchSearchedJob, 
  fetchAddress, 
  fetchCommuteOption, 
  fetchJobList,

} from '../queries';
import { updateJobList } from '../mutations';

class LoadMoreButton extends React.Component {
  async loadMore (){
    const { title } = this.props.fetchSearchedJob.searchedJob;
    const { homeAddress, city, state } = this.props.fetchAddress.address;
    

  }
  render(){
    return (
      <button className={styles.button} onClick={this.loadMore.bind(this)}>
        <h6 className={styles.text}>Load More</h6>
      </button>
    );
  }
}

export default compose(
  graphql(fetchSearchedJob,{
    name: 'fetchSearchedJob'
  }),
  graphql(fetchAddress,{
    name: 'fetchAddress'
  }),
  graphql(fetchCommuteOption,{
    name: 'fetchCommuteOption'
  })
)(LoadMoreButton);