import React, { Component } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { 
	fetchJobList, 
	fetchJobs,
	fetchAddress,
	fetchSearchedJob,
	fetchCommuteOption,
	fetchTimeOption 
} from '../queries';
import { JobListItem }from '../components';
import { updateJobList } from '../mutations';
import { Grid } from 'react-bootstrap';

class JobList extends Component {
	constructor(props){
		super(props);
		this.state = {
			showMap: false
		}
	}
	
	renderJobs(){
		console.log(this.props.fetchCommuteOption.commuteOption.commuteSelected);
		return this.props.fetchJobList.jobList.jobs.map(({title, company, address,commuteTime, commuteDistance})=>{
			const job = {
				title,
				company,
				address,
				commuteTime,
				commuteDistance
			};
			const mapProps = {
				homeAddress: this.props.fetchAddress.address.homeAddress,
				companyAddress: address,
				travelMode: this.props.fetchCommuteOption.commuteOption.commuteSelected,
			};
			return (
				<JobListItem mapProps={mapProps} job={job}/>
			);
		});
	}
	render(){
		return (
			<Grid>
				{this.renderJobs()}
			</Grid>
		);
	}

}

export default compose(
	graphql(fetchJobList,{
		name: 'fetchJobList'
	}),
	graphql(fetchAddress,{
		name: 'fetchAddress'
	}),
	graphql(fetchCommuteOption,{
		name: 'fetchCommuteOption'
	})
)(JobList);