import React from 'react';
import Loader from 'react-loader-spinner';
import SearchIcon from 'react-icons/lib/md/search';
import { graphql, compose } from 'react-apollo';
import { browserHistory } from 'react-router';
import styles from '../styles/SearchButton.css';
import { JobLoader } from '../components';
import { updateJobResults, updateErrorMessage } from '../mutations';


class SearchButton extends React.Component {
  async onLoad(jobs) {
    console.log('Data received on front end: ');
    console.log(jobs);
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
  async onError(error) {
    await this.props.updateErrorMessage({
      variables: {
        content: error,
      },
    });
  }
  render() {
    return (
      <JobLoader
        onError={this.onError.bind(this)}
        onLoad={this.onLoad.bind(this)}
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
            ) : <div>
              <p className={styles.text}>
            Search
              </p>
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

export default compose(
  graphql(updateJobResults, {
    name: 'updateJobResults',
  }),
  graphql(updateErrorMessage, {
    name: 'updateErrorMessage',
  }),
)(SearchButton);
