import React, { Component } from 'react';
import {
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import WalkingIcon from 'react-icons/lib/md/directions-walk';
import BikeIcon from 'react-icons/lib/md/directions-bike';
import CarIcon from 'react-icons/lib/md/directions-car';
import { graphql, compose } from 'react-apollo';
import { fetchCommuteOption } from '../queries';
import { updateCommuteOption } from '../mutations';
import styles from '../styles/CommuteOptions.css';

class CommuteOptions extends Component {
  handleSelection(event) {
    this.props.updateCommuteOption({
      variables: {
        commuteSelected: event,
      },
    });
  }
  render() {
    const commuteSelected = this.props.fetchCommuteOption.commuteOption.commuteSelected;
  	return (<div>
    <h6 className={styles.heading}>How you would like to commute?</h6>
    <ButtonToolbar>
      <ToggleButtonGroup
        defaultValue={commuteSelected}
        bsSize="large"
        className={styles.buttons}
        onChange={this.handleSelection.bind(this)}
        type="radio"
        name="options"
      >
        <ToggleButton value="Driving"><CarIcon /></ToggleButton>
        <ToggleButton value="Bicycling"><BikeIcon /></ToggleButton>
        <ToggleButton value="Walking"><WalkingIcon /></ToggleButton>
      </ToggleButtonGroup>
    </ButtonToolbar>
  </div>
    );
  }
}

export default compose(
  graphql(fetchCommuteOption, {
    name: 'fetchCommuteOption',
  }),
  graphql(updateCommuteOption, {
    name: 'updateCommuteOption',
  }),
)(CommuteOptions);
