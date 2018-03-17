import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { fetchSuggestions } from '../queries';
import styles from '../styles/AutoCompleteList.css';
import cx from 'classnames';

class AutoCompleteList extends Component {
	renderResults(){
		if (!this.props.data.loading && this.props.inputValue!=0)  {
			return this.props.data.suggestions.map(({title}, index)=>{
				return (<div
									{...this.props.getItemProps({item: title})} 
									key={index}
									className={(index==this.props.highlightedIndex)? cx(styles.item,styles.selected):styles.item}
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
			<div className={styles.list}>
				{this.renderResults()}
			</div>
		);
	}
}

export default graphql(fetchSuggestions,{
	options: (props)=>{return {variables: {title: props.inputValue}}}
})(AutoCompleteList);