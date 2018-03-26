import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SearchIcon from 'react-icons/lib/md/search';
import Loader from 'react-loader-spinner';
import { geocodeByAddress } from 'react-places-autocomplete';
import { 
	fetchAddress, 
	fetchSearchedJob, 
	fetchJobs, 
	fetchCommuteOption,
	fetchTimeOption
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
		let results;
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
			console.log('here1');

			try {
				  results = await geocodeByAddress(homeAddress);
			} catch(err){
				console.log('error');
				console.log(err);
			}
			console.log(results);
			if (results.length!=1) {
				await this.props.updateErrorMessage({
					variables: {
						content: 'Invalid address'
					}
				});
				this.setState({isLoading: false});

			} else {
					console.log('here2');
					const {address_components} = results[0];
					const city = this.getCity(address_components);
					const state = this.getState(address_components);
					const {title} = this.props.fetchSearchedJob.searchedJob;
					const {commuteSelected} = this.props.fetchCommuteOption.commuteOption;
					const {timeSelected} = this.props.fetchTimeOption.timeOption;
					console.log(title);
					console.log(homeAddress);
					console.log(city);
					console.log(state);
					console.log(commuteSelected);

					const response = await this.props.client.query({
						query: fetchJobs,
						variables : {
							title,
							homeAddress,
							city,
							state,
							commuteSelected,
							timeSelected : parseInt(timeSelected),
							startingPage : 0
						}
					});
					console.log('results');
					console.log(response.data.jobs);
					const {jobs} = response.data;
					if (jobs.length==0) {
						this.setState({resultsError: true});
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
					<div className={styles.search}>
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
	graphql(fetchTimeOption,{
		name: 'fetchTimeOption'
	}),
	graphql(updateErrorMessage,{
		name: 'updateErrorMessage'
	}),
	withApollo
)(SubmitButton);