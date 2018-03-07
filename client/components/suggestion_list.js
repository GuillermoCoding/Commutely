import React, {Component } from 'react';
import {graphql} from 'react-apollo';
import suggestionsQuery from '../queries/fetchSuggestions';

class SuggestionList extends Component {
	renderResults(){
		
		if (!this.props.data.loading && this.props.inputValue!=0)  {
			return this.props.data.suggestions.map(({title}, index)=>{
				return (<div 
									{...this.props.getItemProps({item: title})} 
									key={index}
									style={{backgroundColor: index==this.props.highlightedIndex? 'grey':'white'}}
									>
					{title}
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


export default graphql(suggestionsQuery,{
	options: (props)=>{return {variables: {title: props.inputValue}}}
})(SuggestionList);