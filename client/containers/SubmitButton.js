import React, { Component } from 'react';
import { 
	fetchAddress, 
	fetchSearchedJob, 
	fetchJobs, 
	fetchCommuteOption,
	fetchTimeOption
} from '../queries';
import { updateJobList } from '../mutations';
import { graphql, compose, withApollo } from 'react-apollo';

class SubmitButton extends Component {
	async handleSubmit(){
		const {zipcode, lat, lng} = this.props.fetchAddress.address;
		const {title} = this.props.fetchSearchedJob.searchedJob;
		const {commuteSelected} = this.props.fetchCommuteOption.commuteOption;
		const {timeSelected} = this.props.fetchTimeOption.timeOption;
		const response = await this.props.client.query({
			query: fetchJobs,
			variables : {
				title,
				zipcode,
				lat : parseInt(lat),
				lng : parseInt(lng),
				commuteSelected,
				timeSelected : parseInt(timeSelected),
				startingPage : 0
			}
		});
		console.log(response.data);
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
	graphql(updateJobList,{
		name: 'updateJobList'
	}),
	graphql(fetchCommuteOption,{
		name: 'fetchCommuteOption'
	}),
	graphql(fetchTimeOption,{
		name: 'fetchTimeOption'
	}),
	withApollo
)(SubmitButton);