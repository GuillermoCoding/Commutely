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
import Infinite from 'react-infinite';

class JobList extends Component {
	constructor(props){
		super(props);
		this.state = {
			lastResult: 0,
			isInfiniteLoading: false,
			elements: this.buildElements(0,20)
		}
	}
	buildElements(start,end){
		var elements = [];
		for (var i = start; i < end; i++) {
            elements.push(<div key={i}>{i}</div>)
        }
        return elements;
	}
	renderJobs(){
		console.log(this.props);
		/*if (!this.props.fetchJobList.loading) {
			
			return this.props.fetchJobList.jobList.jobs.map(({title,company,url,city,state,routeAvailable},index)=>{
				const job = {
					title,
					company,
					city,
					state,
					url,
					routeAvailable,
					index

				}
				return (
					<div key={index} >
					<JobListItem job={job}/>
					</div>
				);
			});
		} else {
			return (
				null
			);
		}*/

		
	}
	handleInfiniteLoad = ()=>{
		console.log('trigger');
		var that = this;
        this.setState({
            isInfiniteLoading: true
        });
        setTimeout(function() {
            var elemLength = that.state.elements.length,
                newElements = that.buildElements(elemLength, elemLength + 50);
            that.setState({
                isInfiniteLoading: false,
                elements: that.state.elements.concat(newElements)
            });
        }, 2500);
		// if (!this.props.fetchJobList.loading && this.props.fetchJobList.jobList.jobs.length!=0) {
		// 	console.log('fetchMore');
		// }
		// console.log("infinite load triggered");


		// const {zipcode, lat, lng} = this.props.fetchAddress.address;
		// const {title} = this.props.fetchSearchedJob.searchedJob;
		// const {commuteSelected} = this.props.fetchCommuteOption.commuteOption;
		// const {timeSelected} = this.props.fetchTimeOption.timeOption;

		// const response = await this.props.client.query({
		// 	query: fetchJobs,
		// 	variables : {
		// 		title,
		// 		zipcode,
		// 		lat : parseInt(lat),
		// 		lng : parseInt(lng),
		// 		commuteSelected,
		// 		timeSelected : parseInt(timeSelected),
		// 		startingPage : 0
		// 	}
		// });
		// this.props.updateJobList({
		// 	variables: {

		// 	}
		// });

	}
	infiniteLoad(){
		return (<div>
            Loading...
		</div>);
	}
	render(){
		return (
			<Infinite 
				useWindowAsScrollContainer
				//containerHeight={250} 
				elementHeight={40}
				infiniteLoadBeginEdgeOffset={300}
				onInfiniteLoad={this.handleInfiniteLoad}
				loadingSpinnerDelegate={this.infiniteLoad()}
				isInfiniteLoading={this.state.isInfiniteLoading}
				>
				{this.state.elements}
			</Infinite>
		)
	};
}



export default compose(
	graphql(fetchJobList,{
		name: "fetchJobList"
	}),
	graphql(fetchAddress,{
		name: "fetchAddress"
	}),
	graphql(fetchSearchedJob,{
		name: "fetchSearchedJob"
	}),
	graphql(fetchCommuteOption,{
		name: "fetchCommuteOption"
	}),
	graphql(fetchTimeOption,{
		name: "fetchTimeOption"
	}),
	graphql(updateJobList,{
		name: "updateJobList"
	}),
	
	withApollo
)(JobList);