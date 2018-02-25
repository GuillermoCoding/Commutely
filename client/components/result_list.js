import React, {Component } from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/fetchJobTitles';

class ResultList extends Component {
	renderResults(){
		if (!this.props.data.loading && this.props.inputValue!=0)  {
			return this.props.data.jobs.map((job, index)=>{
				return (<div 
									{...this.props.getItemProps({item: job.jobTitle})} 
									key={index}
									style={{backgroundColor: index==this.props.highlightedIndex? 'grey':'white'}}
									>
					{job.jobTitle}
					</div>)
			});
		} else {
			null
		}
	}
	render(){
		return (
			<div>
				{this.renderResults()}
			</div>
		);
	}
}


export default graphql(query,{
	options: (props)=>{return {variables: {jobPhrase: props.inputValue}}}
})(ResultList);