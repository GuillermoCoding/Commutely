import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { graphql, compose, withApollo } from 'react-apollo';
import { updateTimeOption } from '../mutations';
import { fetchTimeOption } from '../queries';

class TimeOptions extends Component {
	constructor(props){
		super(props);
		this.state = {
			dropdownOptions: ["5","10","15","20","30","35","40","45+"]
		}
	}
	renderOptions(){
		return this.state.dropdownOptions.map((option,index)=>{
			return (
				<MenuItem onClick={this.handleSelection.bind(this)}key={index}>{option}</MenuItem>
			);
		});
	}
	handleSelection(event){
		this.props.updateTimeOption({
			variables: {
				timeSelected : event.target.innerText
			}
		});
	}

  render(){
		return (
			<DropdownButton
				title={this.props.data.timeOption.timeSelected}
				id="dropdown"
			>
				{this.renderOptions()}
			</DropdownButton>
		);
  }
}

export default compose(
	graphql(updateTimeOption,{
		name: "updateTimeOption"
	}),
	graphql(fetchTimeOption)
)(TimeOptions);