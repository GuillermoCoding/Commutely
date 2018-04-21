import React from 'react';
import { withApollo } from 'react-apollo';
import { geocodeByAddress } from 'react-places-autocomplete';
import PropTypes from 'prop-types';
import {
  fetchAddress,
  fetchSearchedJob,
  fetchCommuteOption,
  fetchJobs,
} from '../queries';

class JobLoader extends React.Component {
  static getCity(addressComponents) {
    for (let i = 0; i < addressComponents.length; i += 1) {
      const component = addressComponents[i];
      if (component.types.includes('locality')) {
        return component.long_name;
      }
    }
    return null;
  }
  static getState(addressComponents) {
    for (let i = 0; i < addressComponents.length; i += 1) {
      const component = addressComponents[i];
      if (component.types.includes('administrative_area_level_1')) {
        return component.short_name;
      }
    }
    return null;
  }
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      getButtonProps: {
        onClick: this.onClick.bind(this),
      },
    };
  }

  async onClick() {
    this.setState({ isLoading: true });
    const addressResponse = await this.props.client.query({
      query: fetchAddress,
    });
    const { homeAddress } = addressResponse.data.address;
    if (homeAddress) {
      const searchedJobResponse = await this.props.client.query({
        query: fetchSearchedJob,
      });
      const { title } = searchedJobResponse.data.searchedJob;
      const commuteOptionResponse = await this.props.client.query({
        query: fetchCommuteOption,
      });
      const { commuteSelected } = commuteOptionResponse.data.commuteOption;
      try {
        const results = await geocodeByAddress(homeAddress);
        const addressComponents = results[0].address_components;
        const city = JobLoader.getCity(addressComponents);
        const state = JobLoader.getState(addressComponents);
        const { startingIndex } = this.props;
        const response = await this.props.client.query({
          query: fetchJobs,
          variables: {
            title,
            homeAddress,
            city,
            state,
            commuteSelected,
            startingIndex,
          },
        });
        const { jobs } = response.data;
        this.props.onLoad(jobs);
      } catch (err) {
        this.props.onError('Invalid address');
      }
    } else {
      this.props.onError('Address required');
    }
    this.setState({ isLoading: false });
  }
  render() {
    return (
      <div>
        {this.props.render(this.state)}
      </div>
    );
  }
}
JobLoader.propTypes = {
  render: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
};

export default withApollo(JobLoader);
