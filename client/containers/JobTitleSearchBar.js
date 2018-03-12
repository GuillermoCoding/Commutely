import React, { Component } from 'react';
import Downshift from 'downshift';
import { AutoCompleteList } from './index';
import { updateSearchedJob } from '../mutations';
import { graphql, compose, withApollo } from 'react-apollo';

class JobTitleSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			inputValue:''
		}
	}
	onInputValueChange(inputValue){
		this.setState({inputValue});
	}
	onChange(selectedItem){
		this.props.updateSearchedJob({
			variables : {
				title: selectedItem
			}
		});
	}
	render(){
		return (
			<Downshift
				onInputValueChange={inputValue=>this.onInputValueChange(inputValue)}
				onChange={selectedItem=>this.onChange(selectedItem)}
				render={({inputValue, getInputProps, isOpen, getItemProps, highlightedIndex,selectedItem})=>(
					<div>
						<input {...getInputProps()}/>
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
export default compose(graphql(updateSearchedJob, {name: 'updateSearchedJob'}))(JobTitleSearchBar);