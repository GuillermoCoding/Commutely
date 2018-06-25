import React from 'react';
import Loader from 'react-loader-spinner';
import SearchIcon from 'react-icons/lib/md/search';
import { graphql, compose } from 'react-apollo';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles/SearchButton.css';
import { JobLoader } from '../components';
import { updateJobResults, updateErrorMessage } from '../mutations';

class SearchButton extends React.Component {
  onLoad = async (jobs) => {
    if (jobs.length === 0) {
      this.props.updateErrorMessage({
        variables: {
          content: 'No jobs found, please try again',
        },
      });
    } else {
      await this.props.updateJobResults({
        variables: {
          jobs,
        },
      });
      browserHistory.push('/results');

    }
  }
  onError = async (error) => {
    await this.props.updateErrorMessage({
      variables: {
        content: error,
      },
    });
  }
  render() {
    return (
      <JobLoader
        onFetch={this.props.onLoad}
        onFinish={this.props.onFinish}
        onError={this.onError}
        onLoad={this.onLoad}
        startingIndex={0}
        render={({ getButtonProps, isLoading }) => (
          <button
            {...getButtonProps}
            disabled={isLoading}
            className={styles.button}
          >
            <div className={styles.content}>
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="35"
                  width="35"
                />
            ) :
                <div>
                  <p className={styles.text}> Search </p>
                  <div className={styles.icon}>
                    <SearchIcon />
                  </div>
                </div>
            }
            </div>
          </button>
          )}
      />
    );
  }
}
SearchButton.propTypes = {
  updateJobResults: PropTypes.func.isRequired,
  updateErrorMessage: PropTypes.func.isRequired,
};
export default compose(
  graphql(updateJobResults, {
    name: 'updateJobResults',
  }),
  graphql(updateErrorMessage, {
    name: 'updateErrorMessage',
  }),
)((SearchButton));

