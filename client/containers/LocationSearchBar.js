import React, { Component } from 'react';
import Downshift from 'downshift';
import { graphql, compose, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { updateAddress, updateErrorMessage } from '../mutations';
import { fetchAddress, fetchLocationSuggestions } from '../queries';
import { AutoCompleteSearch, AutoCompleteResults } from '../components';

class LocationSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      isLoading: false,
    };
  }
  componentWillMount() {
    if (this.props.fetchAddress.address.homeAddress) {
      this.setState({ input: this.props.fetchAddress.address.homeAddress });
    }
  }
  onInputValueChange = async (input) => {
    await this.setState({ isLoading: true });
    await this.setState({ input });
    const results = await this.props.client.query({
      query: fetchLocationSuggestions,
      variables: {
        input: this.state.input,
      },
    });
    await this.setState({ isLoading: false });
    await this.setState({ results: results.data.locationSuggestions });
  }
  onChange = async (input) => {
    await this.setState({ input });
    await this.props.updateAddress({
      variables: {
        homeAddress: input,
      },
    });
    await this.props.updateErrorMessage({
      varibles: {
        content: '',
      },
    });
  }
  onStateChange = async (data) => {
    if (data.highlightedIndex != null) {
      await this.setState({ input: this.state.results[data.highlightedIndex] });
    }
  }
  render() {
    return (
      <Downshift
        defaultHighlightedIndex={0}
        inputValue={this.state.input}
        onChange={this.onChange}
        onStateChange={this.onStateChange}
        onInputValueChange={this.onInputValueChange}
        render={({
          getInputProps, getItemProps, isOpen, highlightedIndex,
        }) => (
          <div>
            <AutoCompleteSearch
              heading="Enter home address (Full address required)"
              placeholder="Enter home address..."
              getInputProps={getInputProps}
              isLoading={this.state.isLoading}
            />
            {isOpen ?
              <AutoCompleteResults
                results={this.state.results}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
              : null}
          </div>
          )}
      />
    );
  }
}
LocationSearchBar.propTypes = {
  fetchAddress: PropTypes.shape({
    address: PropTypes.shape({
      homeAddress: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  updateAddress: PropTypes.func.isRequired,
  updateErrorMessage: PropTypes.func.isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
};
export default compose(
  graphql(updateAddress, {
    name: 'updateAddress',
  }),
  graphql(fetchAddress, {
    name: 'fetchAddress',
  }),
  graphql(updateErrorMessage, {
    name: 'updateErrorMessage',
  }),
  withApollo,
)(LocationSearchBar);
