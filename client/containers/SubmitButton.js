import React, { Component } from 'react';
// import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SearchIcon from 'react-icons/lib/md/search';
import Loader from 'react-loader-spinner';
import { geocodeByAddress } from 'react-places-autocomplete';
import { 
	fetchAddress, 
	fetchSearchedJob, 
	fetchJobs, 
	fetchCommuteOption,
  fetchStartingIndex
} from '../queries';
import { updateJobList, updateErrorMessage } from '../mutations';
import { graphql, compose, withApollo } from 'react-apollo';
import styles from '../styles/SubmitButton.css';

class SubmitButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: false,
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
	async handleSubmit(){
    console.log('here');
    const result = await this.props.client.query({
      query: fetchStartingIndex
    });
    
    console.log(result.data);
		const {homeAddress, city, state} = this.props.fetchAddress.address;
		await this.setState({isLoading:true});
		if (!homeAddress) {
			this.props.updateErrorMessage({
				variables: {
					content: 'Address is required for route calculations'
				}
			});
			this.setState({isLoading: false});
		} else {
        const results = await geocodeByAddress(homeAddress);
        const {address_components} = results[0];
        const city = this.getCity(address_components);
        const state = this.getState(address_components);
        const {title} = this.props.fetchSearchedJob.searchedJob;
        // console.log(`Searching with ${title} and ${homeAddress}`);

        const {commuteSelected} = this.props.fetchCommuteOption.commuteOption;
        const response = await this.props.client.query({
          query: fetchJobs,
          variables : {
            title,
            homeAddress,
            city,
            state,
            commuteSelected,
            startingIndex : 0
          }
        });
        const {jobs} = response.data;
        if (jobs.length==0) {
          await this.props.updateErrorMessage({
            variables: {
              content: 'No jobs found, Please try a different address or job title'
            }
          });
          this.setState({isLoading: false});
        } else {
          await this.props.updateJobList({
            variables : {
              jobs
            }
          });
          browserHistory.push('/results');
        }		
		}
	}
	renderButtonContent(){
		if (this.state.isLoading) {
			return (
				<div>
					<Loader
						type='ThreeDots'
						color="#ffffff"
						height="35"	
						width="35"
					/>
				</div>
			);
		} else {
			return (
				<div>
					<p className={styles.text}>
					Search
					</p>
					<div className={styles.icon}>
					<SearchIcon/>
					</div>
				</div>
			);
		}
	}
	render() {
		const { isLoading } = this.state;
		return(
				<div>
					<button
						disabled={isLoading}
						className={styles.button} 
						onClick={this.handleSubmit.bind(this)}>
						<div className={styles.content}>
							{this.renderButtonContent()}
						</div>
					</button>
				
				</div>
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
	graphql(updateJobList,{
		name: 'updateJobList'
	}),
	graphql(fetchCommuteOption,{
		name: 'fetchCommuteOption'
	}),
	graphql(updateErrorMessage,{
		name: 'updateErrorMessage'
	}),
	withApollo
)(SubmitButton);