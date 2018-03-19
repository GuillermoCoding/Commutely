import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ToggleButtonGroup,
	ToggleButton 
} from 'react-bootstrap';
import WalkingIcon from 'react-icons/lib/md/directions-walk';
import BikeIcon from 'react-icons/lib/md/directions-bike';
import CarIcon from 'react-icons/lib/md/directions-car';
import { graphql, withApollo, compose } from 'react-apollo';
import { fetchCommuteOption } from '../queries';
import { updateCommuteOption } from '../mutations';
import styles from '../styles/CommuteOptions.css';

class CommuteOptions extends Component {
	handleSelection(event){
		console.log(event);
		this.props.updateCommuteOption({
			variables: {
				commuteSelected: event
			}
		});
	}
  render(){
  	return (
				<ButtonToolbar>
					<ToggleButtonGroup 
						defaultValue={'walking'}
						bsSize="large" 
						className={styles.buttons}
						onChange={this.handleSelection.bind(this)} 
						type='radio' 
						name='options'>
						<ToggleButton value={'walking'}><WalkingIcon/></ToggleButton>
						<ToggleButton value={'bicycling'}><BikeIcon/></ToggleButton>
						<ToggleButton value={'driving'}><CarIcon/></ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
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