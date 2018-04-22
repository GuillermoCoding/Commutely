import React from 'react';
import { graphql } from 'react-apollo';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { JobLoader } from '../components';
import { updateJobResults } from '../mutations';
import styles from '../styles/LoadMoreButton.css';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startingIndex: 10,
    };
  }
  onLoad = async (jobs) => {
    await this.props.updateJobResults({
      variables: {
        jobs,
      },
    });
    await this.setState(prevState => ({ startingIndex: prevState.startingIndex + 10 }));
  }
  render() {
    return (
      <JobLoader
        onLoad={this.onLoad}
        startingIndex={this.state.startingIndex}
        render={({ getButtonProps, isLoading }) => (
          <button
            {...getButtonProps}
            disabled={isLoading}
            className={styles.button}
          >
            <div>
              {isLoading ? (
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="35"
                  width="35"
                />
              ) : <p className={styles.text}> Load more </p>
              }
            </div>
          </button>
          )}
      />
    );
  }
}
LoadMoreButton.propTypes = {
  updateJobResults: PropTypes.func.isRequired,
};
export default graphql(updateJobResults, {
  name: 'updateJobResults',
})(LoadMoreButton);
