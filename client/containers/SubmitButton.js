import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import SearchIcon from 'react-icons/lib/md/search';
import ReactLoading from 'react-loading';
import { 
	fetchAddress, 
	fetchSearchedJob, 
	fetchJobs, 
	fetchCommuteOption,
	fetchTimeOption
} from '../queries';
import { updateJobList } from '../mutations';
import { graphql, compose, withApollo } from 'react-apollo';
import styles from '../styles/SubmitButton.css';

class SubmitButton extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoading: false
		}
	}
	async handleSubmit(){
		await this.setState({isLoading:true});
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
		browserHistory.push('/results');

		// const {jobs} = response.data;
		// this.props.updateJobList({
		// 	variables : {
		// 		jobs
		// 	}
		// });
	}
	renderButtonContent(){

		if (this.state.isLoading) {
			return (
				<ReactLoading
					height={'100%'}
					width={'34px'}
					type={'spinningBubbles'}
					className={styles.loading}
				/>
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
				<Button
					disabled={isLoading}
					className={styles.button} 
					onClick={this.handleSubmit.bind(this)}>
					<div className={styles.content}>
						{this.renderButtonContent()}
					</div>
				</Button>
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