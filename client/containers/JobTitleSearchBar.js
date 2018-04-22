import React, { Component } from 'react';
import Downshift from 'downshift';
import { graphql, compose, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { updateSearchedJob, updateErrorMessage } from '../mutations';
import { fetchSearchedJob, fetchJobTitleSuggestions } from '../queries';
import { AutoCompleteSearch, AutoCompleteResults } from '../components';

class JobTitleSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: [],
      isLoading: false,
    };
  }
  async componentWillMount() {
    const { title } = this.props.fetchSearchedJob.searchedJob;
    await this.setState({ input: title });
  }
  onInputValueChange = async (input) => {
    await this.setState({ input });
    if (input.length !== 0) {
      await this.setState({ isLoading: true });
      const results = await this.props.client.query({
        query: fetchJobTitleSuggestions,
        variables: {
          input,
        },
      });
      await this.setState({ isLoading: false });
      await this.setState({ results: results.data.jobTitleSuggestions });
    } else {
      await this.setState({ results: [] });
    }
  }
  onChange = async (input) => {
    await this.props.updateSearchedJob({
      variables: {
        title: input,
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
  onOuterClick = async ({ inputValue }) => {
    await this.setState({ input: inputValue });
    await this.props.updateSearchedJob({
      variables: {
        title: inputValue,
      },
    });
    await this.props.updateErrorMessage({
      varibles: {
        content: '',
      },
    });
  }

  render() {
    return (
      <Downshift
        defaultHighlightedIndex={0}
        onStateChange={this.onStateChange}
        onOuterClick={this.onOuterClick}
        inputValue={this.state.input}
        onChange={this.onChange}
        onInputValueChange={this.onInputValueChange}
        render={({
          getInputProps, getItemProps, isOpen, highlightedIndex,
        }) => (
          <div>
            <AutoCompleteSearch
              heading="Enter job title (Optional)"
              placeholder="Enter job title..."
              getInputProps={getInputProps}
              isLoading={this.state.isLoading}
            />
            {isOpen ? (
              <AutoCompleteResults
                isOpen={isOpen}
                results={this.state.results}
                getItemProps={getItemProps}
                highlightedIndex={highlightedIndex}
              />
            ) : null}
          </div>
        )}
      />
    );
  }
}
JobTitleSearchBar.propTypes = {
};
export default compose(
  graphql(updateSearchedJob, {
    name: 'updateSearchedJob',
  }),
  graphql(fetchSearchedJob, {
    name: 'fetchSearchedJob',
  }),
  graphql(updateErrorMessage, {
    name: 'updateErrorMessage',
  }),
  withApollo,
)(JobTitleSearchBar);
