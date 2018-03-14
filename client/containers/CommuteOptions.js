import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import Bicycle from 'react-icons/lib/fa/bicycle';
import Person from 'react-icons/lib/fa/street-view';
import Car from 'react-icons/lib/fa/automobile';
import Transit from 'react-icons/lib/fa/train';
import Uber from 'react-icons/lib/fa/cab';
import { graphql, withApollo, compose } from 'react-apollo';
import { fetchCommuteOption } from '../queries';
import { updateCommuteOption } from '../mutations';

class CommuteOptions extends Component {
	constructor(props){
		super(props);
		this.state = {
			dropdownOptions: ["Car","Bicycle","Walking","Transit","Uber"]
		}
	}
	renderOptions(){
		const commuteSelected = this.props.data.commuteOption.commuteSelected;
		return this.state.dropdownOptions.map((option,index)=>{
			return (
				<MenuItem value={option} onClick={this.handleSelection.bind(this)} active={option==commuteSelected?true:false} key={index} >{option}</MenuItem>
			); 
		});
	}
	handleSelection(event){
		this.props.updateCommuteOption({
			variables: {
				commuteSelected: event.target.innerText
			}
		});
	}
  render(){
  	return (
			<div>
				<DropdownButton
					title={this.props.data.commuteOption.commuteSelected}
					id="dropdown"
				>
					{this.renderOptions()}
				</DropdownButton>
			</div>
    );
  }
}

export default compose(
	graphql(fetchCommuteOption),
	graphql(updateCommuteOption,{
		name: "updateCommuteOption"
	}),
	withApollo
)(CommuteOptions);