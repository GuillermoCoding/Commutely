import React from 'react';
import { withApollo, compose, graphql  } from 'react-apollo';
import { geocodeByAddress } from 'react-places-autocomplete';
import { 
  fetchAddress,
  fetchSearchedJob,
  fetchCommuteOption,
  fetchStartingIndex,
  fetchJobs
 } from '../queries'
 import { updateErrorMessage } from '../mutations/updateErrorMessage';

class JobLoader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      getButtonProps: {
        onClick: this.onClick.bind(this)
      }
    }
  }
  getCity(addressComponents){
    for (let i =0; i < addressComponents.length; i++){
      const component = addressComponents[i];
      if (component.types.includes('locality')){
        return component.long_name;
      }
    }
  }
  getState(addressComponents){
		for (let i =0; i < addressComponents.length; i++){
			const component = addressComponents[i];
			if (component.types.includes('administrative_area_level_1')){
				return component.short_name;
			}
		}
	}
async onClick(){
     this.setState({isLoading: true});
    const addressResponse =  this.props.client.query({
      query: fetchAddress
    });

    const { homeAddress, city, state } = addressResponse.data.address;
    if (homeAddress) {
      const searchedJobResponse =  this.props.client.query({
        query: fetchSearchedJob
      });
      const { title } = searchedJobResponse.data.searchedJob;
      const commuteOptionResponse =  this.props.client.query({
        query: fetchCommuteOption
      });
      const { commuteSelected } = commuteOptionResponse.data.commuteOption;
      try {
        const results =  geocodeByAddress(homeAddress);
        const addressComponents = results[0].address_components;
        const city = this.getCity(addressComponents);
        const state = this.getState(addressComponents);
        const startingIndex = this.props.startingIndex;
        const response =  this.props.client.query({
          query: fetchJobs,
          variables: {
            title,
            homeAddress,
            city,
            state,
            commuteSelected,
            startingIndex
          }
        });
        const { jobs } = response.data;
        this.props.onLoad(jobs);
      } catch(err){
        this.props.onError('Invalid address');
      }
    } else {
      this.props.onError('Address required');
    }
     this.setState({isLoading: false});
  }
  render(){
    console.log('JobLoader render');
    return (    
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}

export default withApollo(JobLoader);