import React, { Component } from 'react';
import fetchAddress from '../queries/fetchAddress';
import fetchSearchedJob from '../queries/fetchSearchedJob';
import fetchJobs from '../queries/fetchJobs';
import updateJobList from '../mutations/updateJobList';
import {graphql, compose, withApollo} from 'react-apollo';

class Button extends Component {
	async handleSubmit(){
		const {zipcode} = this.props.fetchAddress.address;
		const {title} = this.props.fetchSearchedJob.searchedJob;
		const response = await this.props.client.query({
			query: fetchJobs,
			variables : {
				title,
				zipcode
			}
		});
		this.props.updateJobList({
			variables : {
				jobs : response.data.jobs
			}
		});
	}
	render() {
		return(
			<div>
				<button onClick={this.handleSubmit.bind(this)}>Search</button>
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
)(Button);