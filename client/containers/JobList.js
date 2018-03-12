import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { fetchJobList } from '../queries';
import { JobListItem }from '../components';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

class JobList extends Component {
	renderJobs(){
		if (!this.props.data.loading) {
			return this.props.data.jobList.jobs.map(({title,company,url,city,state},index)=>{
				const job = {
					title,
					company,
					city,
					state,
					url
				}
				return (
					<JobListItem key={index} job={job}/>
				);
			});
		} else {
			return (
				<Spinner/>
			);
		}
	}
	render(){
		return (
			<div>
				{this.renderJobs()}
			</div>
		)
	};
}


export default graphql(fetchJobList)(JobList);