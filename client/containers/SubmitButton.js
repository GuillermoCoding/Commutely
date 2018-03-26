import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SearchIcon from 'react-icons/lib/md/search';
import Loader from 'react-loader-spinner';

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
	async handleSubmit(){
		const {homeAddress, city, state} = this.props.fetchAddress.address;

		if (!homeAddress) {
			console.log('address error');
			this.props.updateErrorMessage({
				variables: {
					content: 'Address is required for route calculations'
				}
			});
		} else {
			await this.setState({isLoading:true});
			const {title} = this.props.fetchSearchedJob.searchedJob;
			const {commuteSelected} = this.props.fetchCommuteOption.commuteOption;
			const {timeSelected} = this.props.fetchTimeOption.timeOption;
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