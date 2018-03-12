import React, { Component } from 'react'
import ArrowLeft from 'react-icons/lib/ti/arrow-left';
import ArrowRight from 'react-icons/lib/ti/arrow-right';
import { updateJobList } from '../mutations';
import { 
	fetchJobs, 
	fetchJobList, 
	fetchAddress,  
	fetchSearchedJob
} from '../queries';
import { graphql, compose, withApollo } from 'react-apollo';

class NavigationFooter extends Component {
	constructor(props){
		super(props);
		this.state = {
			firstNumber: 1,
			lastNumber: 5,
			currentPage : 1
		}
	}

	async handleLeftClick(){
		await this.setState((prevState)=>{
			if ((prevState.currentPage-1) % 5 ==0) {
				return {
					firstNumber : prevState.currentPage - 5,
					lastNumber : prevState.currentPage -1,
					currentPage : prevState.currentPage - 1
				}
			} else {
				return {
					currentPage : prevState.currentPage -1
				}
			}
		});
		const {zipcode} = this.props.fetchAddress.address;
		const {title} = this.props.fetchSearchedJob.searchedJob;
		const response = await this.props.client.query({
			query: fetchJobs,
			variables : {
				title,
				zipcode,
				startingPage : this.state.currentPage
			}
		});
		this.props.updateJobList({
			variables: {
				jobs : response.data.jobs
			}
		});
	}
	async handleRightClick(){
		await this.setState((prevState)=>{
			if (prevState.currentPage % 5 ==0) {
				return {
					firstNumber : prevState.currentPage + 1,
					lastNumber : prevState.currentPage + 5,
					currentPage : prevState.currentPage + 1
				}
			} else {
				return {
					currentPage : prevState.currentPage + 1
				}
			}
		});
		const {zipcode} = this.props.fetchAddress.address;
		const {title} = this.props.fetchSearchedJob.searchedJob;
		const response = await this.props.client.query({
			query: fetchJobs,
			variables : {
				title,
				zipcode,
				startingPage : this.state.currentPage
			}
		});
		this.props.updateJobList({
			variables: {
				jobs : response.data.jobs
			}
		});

	}
	handleNumberClick(event){
		const currentPage = parseInt(event.target.innerHTML);
		this.setState({ currentPage });
	}
	renderLeftArrow(){
		const divStyle={
			background: 'rgba(0,0,0,0.7)',
		}
		if (this.state.currentPage==1) {
			return (
				<div style={divStyle}>
					<ArrowLeft onClick={this.handleLeftClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				<ArrowLeft onClick={this.handleLeftClick.bind(this)}/>
			);
			
		}
	}
	renderNumbers(){		
		const array = [];
		const { firstNumber, lastNumber, currentPage } = this.state;
		for (let i = firstNumber; i <= lastNumber; i++){
			array.push(i);
		}
		return array.map((number)=>{
			if (currentPage == number) {
				const divStyle = {
					cursor: 'pointer',
					fontWeight: '800',
					color: 'blue'
				}
				return (
					<div key={number} style={divStyle} onClick={event => this.handleNumberClick(event)}>
						{number}
					</div>
				);
			} else {
				const divStyle = {
					cursor: 'pointer',
				}
				return (
					<div key={number} style={divStyle}onClick={event => this.handleNumberClick(event)}>
						{number}
					</div>
				);
			}
			
		});
	}
	render(){
		if (this.props.fetchJobList.jobList.jobs.length!=0) {
			return (
				<div onClick={this.handleLeft}>
					{this.renderLeftArrow()}
					{this.renderNumbers()}
					<ArrowRight onClick={this.handleRightClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				null
			);
		}

	}


}

export default compose(
	graphql(fetchJobs,{
		name: "fetchJobs"
	}),
	graphql(updateJobList,{
		name: "updateJobList"
	}),
	graphql(fetchJobList,{
		name : "fetchJobList"
	}),
	graphql(fetchAddress,{
		name: "fetchAddress"
	}),
	graphql(fetchSearchedJob,{
		name: "fetchSearchedJob"
	}),
	withApollo
)(NavigationFooter);