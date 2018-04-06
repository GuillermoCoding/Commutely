import React, { Component } from 'react'
import ArrowLeft from 'react-icons/lib/ti/arrow-left';
import ArrowRight from 'react-icons/lib/ti/arrow-right';
import { updateJobResults } from '../mutations';
import { 
	fetchJobs, 
	fetchJobResults, 
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
		this.props.updateJobResults({
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
		this.props.updateJobResults({
			variables: {
				jobs : response.data.jobs
			}
		});

	}
	async handleNumberClick(event){
		const currentPage = parseInt(event.target.innerHTML);
		await this.setState({ currentPage });
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
		this.props.updateJobResults({
			variables: {
				jobs : response.data.jobs
			}
		});
		
	}
	renderLeftArrow(){
		const divStyle={
			color: 'white',
		}
		if (this.state.currentPage==1) {
			return (
				<div id='navigation-left-arrow' style={divStyle}>
					<ArrowLeft onClick={this.handleLeftClick.bind(this)}/>
				</div>
			);
		} else {
			return (
				<div id='navigation-left-arrow'>
				<ArrowLeft onClick={this.handleLeftClick.bind(this)}/>
				</div>
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
					<div className='navigation-footer-item' key={number} style={divStyle} onClick={event => this.handleNumberClick(event)}>
						{number}
					</div>
				);
			} else {
				const divStyle = {
					cursor: 'pointer',
				}
				return (
					<div className='navigation-footer-item' key={number} style={divStyle}onClick={event => this.handleNumberClick(event)}>
						{number}
					</div>
				);
			}
			
		});
	}
	render(){
		if (this.props.fetchJobResults.jobList.jobs.length!=0) {
			return (
				<div id='navigation-footer'>
					{this.renderLeftArrow()}
					{this.renderNumbers()}
					<div id='navigation-right-arrow'>
						<ArrowRight onClick={this.handleRightClick.bind(this)}/>
					</div>
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
	// graphql(fetchJobs,{
	// 	name: "fetchJobs"
	// }),
	graphql(updateJobResults,{
		name: "updateJobResults"
	}),
	graphql(fetchJobResults,{
		name : "fetchJobResults"
	}),
	graphql(fetchAddress,{
		name: "fetchAddress"
	}),
	graphql(fetchSearchedJob,{
		name: "fetchSearchedJob"
	}),
	withApollo
)(NavigationFooter);