import React from 'react';
import { withApollo } from 'react-apollo';
import { geocodeByAddress } from 'react-places-autocomplete';
import { 
  fetchAddress,
  fetchSearchedJob,
  fetchCommuteOption,
  fetchStartingIndex,
  fetchJobs
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
  onClick = async()=>{
    console.log('onClick from JobLoader render prop');
    await this.setState({isLoading: true});
    const addressResponse = await this.props.client.query({
      query: fetchAddress
    });
    const { homeAddress, city, state } = addressResponse.data.address;
    const searchedJobResponse = await this.props.client.query({
      query: fetchSearchedJob
    });
    const { title } = searchedJobResponse.data.searchedJob;
    const commuteOptionResponse = await this.props.client.query({
      query: fetchCommuteOption
    });
    const { commuteSelected } = commuteOptionResponse.data.commuteOption;
    try {
      const results = await geocodeByAddress(homeAddress);
      const addressComponents = results[0].address_components;
      const city = this.getCity(addressComponents);
      const state = this.getState(addressComponents);
      const startingIndex = this.props.startingIndex;
      //console.log(title+' '+homeAddress+' '+city+' '+state+' '+commuteSelected);
      const response = await this.props.client.query({
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
      await this.setState({isLoading: false});
      const { jobs } = response.data;
      this.props.onLoad(jobs);
    } catch(err){
      console.log('Error geocodeByAddress:');
      console.log(err);
    }

    
    
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

export default withApollo(JobLoader);