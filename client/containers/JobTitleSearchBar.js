import React, { Component } from 'react';
import Downshift from 'downshift';
import { AutoCompleteList } from './index';
import { updateSearchedJob } from '../mutations';
import { fetchSearchedJob } from '../queries';
import { graphql, compose, withApollo } from 'react-apollo';
import styles from '../styles/JobTitleSearchBar.css';

class JobTitleSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			inputValue:''
		}
	}
	onChange(selectedItem){
		this.props.updateSearchedJob({
			variables : {
				title: selectedItem
			}
		});
	}

	componentWillMount(){
		const { title } = this.props.fetchSearchedJob.searchedJob;
		this.setState({inputValue: title});
	}
	render(){
		return (
			<Downshift
				defaultInputValue={this.state.inputValue}
				onInputValueChange={inputValue=>this.setState({inputValue})}
				onChange={selectedItem=>this.onChange(selectedItem)}
				render={({inputValue, getInputProps, isOpen, getItemProps, highlightedIndex,selectedItem})=>(
					<div>
						<input className={styles.input} {...getInputProps()}/>
						{isOpen ? (			
							<AutoCompleteList 
								getItemProps={getItemProps} 
								inputValue={this.state.inputValue}
								highlightedIndex={highlightedIndex}
								selectedItem={selectedItem}
							/>
						): null}
					</div>
					
				)}
			/>
		);
	}
}
export default compose(
	graphql(updateSearchedJob,{
		name: 'updateSearchedJob'
	}),
	graphql(fetchSearchedJob,{
		name: 'fetchSearchedJob'
	})
	)(JobTitleSearchBar);