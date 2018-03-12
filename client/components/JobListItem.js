import React, { Component } from 'react';
import { MapView } from './';

class JobListItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			displayMap: false
		}
	}
	handleClick(){
		this.setState(prevState=>({
			displayMap : !prevState.displayMap
		}));
	}
	displayMap(){
		if (this.state.displayMap) {
			const {company, city, state} = this.props.job;
			const destinationProps = {
				company,
				city,
				state
			}
			return (
				<MapView destinationProps={destinationProps}/>
			);
		} else {
			return (
				null
			);
		}
	}
	render(){
		return (
			<div>
				<h3>{this.props.job.title}</h3>
				<h5>{this.props.job.company}</h5>
				<h5>{this.props.job.city}</h5>
				<h5>{this.props.job.state}</h5>
				<a href={`${this.props.job.url}`}>See more</a>
				<button onClick={this.handleClick.bind(this)}>View route</button>
				{this.displayMap()}
			</div>
		);
	}

}

export default JobListItem;