import React, { Component } from 'react';
import { 
	fetchAddress, 
	fetchSearchedJob, 
	fetchJobs, 
} from '../queries';
import { updateJobList } from '../mutations';
import { graphql, compose, withApollo } from 'react-apollo';

class SubmitButton extends Component {
	async handleSubmit(){
		const {zipcode} = this.props.fetchAddress.address;
		const {title} = this.props.fetchSearchedJob.searchedJob;
		const response = await this.props.client.query({
			query: fetchJobs,
			variables : {
				title,
				zipcode,
				startingPage : 0
			}
		});
		const {jobs} = response.data;
		this.props.updateJobList({
			variables : {
				jobs
			}
		});
	}
	render() {
		return(
			<div>
				<button onClick={this.handleSubmit.bind(this)}>Searcsssh</button>
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
	graphql(fetchJobs),
	graphql(updateJobList,{
		name: 'updateJobList'
	}),
	withApollo
)(SubmitButton);