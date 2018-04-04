import React from 'react';
import { withApollo } from 'react-apollo';
import { 
  fetchAddress,
  fetchSearchedJob,
  fetchCommuteOption,
  fetchStartingIndex
 } from '../queries'

class JobLoader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      getButtonProps: {
        onClick: this.onClick
      }
    }
  }
  onClick =()=>{
    console.log('onClick from JobLoader render prop');
    const address = this.props.client.query({
      query: fetchAddress
    });
    console.log(address);
    const searchedJob = this.props.client.query({
      query: fetchSearchedJob
    });
    console.log(searchedJob);
    // this.props.client.query({
    //   query: fetchJobs,
    //   variables: {

    //   }
    // });
    // // console.log(this.props.startingIndex)
    // this.props.onLoad();
  }
  render(){
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default JobLoader;