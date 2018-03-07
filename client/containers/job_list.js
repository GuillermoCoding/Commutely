import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import fetchJobList from '../queries/fetchJobList';
import JobItem from '../components/job_item';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

class JobList extends Component {

	renderJobs(){
		console.log(this.props.data.loading);
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
					<JobItem key={index} job={job}/>
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