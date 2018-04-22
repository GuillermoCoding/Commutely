import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Grid } from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  fetchJobResults,
  fetchAddress,
  fetchCommuteOption,
} from '../queries';
import { JobListItem } from '../components';
import { updateStartingIndex, updateJobResults, resetJobResults } from '../mutations';
import styles from '../styles/JobList.css';

class JobList extends Component {
  async componentWillUnmount() {
    await this.props.updateStartingIndex({
      variables: {
        index: 0,
      },
    });
    await this.props.resetJobResults();
  }
  renderJobs() {
    return this.props.fetchJobResults.jobResults.jobs.map(({
      title, company, address, commuteTime, commuteDistance, snippet, url,
    }) => {
      const job = {
        title,
        company,
        snippet,
        url,
        address,
        commuteTime,
        commuteDistance,
      };
      const map = {
        homeAddress: this.props.fetchAddress.address.homeAddress,
        companyAddress: address,
        travelMode: this.props.fetchCommuteOption.commuteOption.commuteSelected,
      };
      return (
        <JobListItem key={url} map={map} job={job} />
      );
    });
  }
  render() {
    return (
      <Grid>
        {this.renderJobs()}
        <span className={styles.indeed}id="indeed_at">
          <a title="Job Search" href="https://www.indeed.com" rel="nofollow">
            jobs by <img alt="Indeed" src="https://www.indeed.com/p/jobsearch.gif" />
          </a>
        </span>
        {this.props.children}
      </Grid>
    );
  }
}
JobList.propTypes = {
  children: PropTypes.node.isRequired,
  fetchAddress: PropTypes.shape({
    address: PropTypes.shape({
      homeAddress: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchCommuteOption: PropTypes.shape({
    commuteOption: PropTypes.shape({
      commuteSelected: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  fetchJobResults: PropTypes.shape({
    jobResults: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      commuteTime: PropTypes.string.isRequired,
      commuteDistance: PropTypes.string.isRequired,
      snippet: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  resetJobResults: PropTypes.func.isRequired,
  updateStartingIndex: PropTypes.func.isRequired,
};
export default compose(
  graphql(fetchJobResults, {
    name: 'fetchJobResults',
  }),
  graphql(fetchAddress, {
    name: 'fetchAddress',
  }),
  graphql(fetchCommuteOption, {
    name: 'fetchCommuteOption',
  }),
  graphql(updateJobResults, {
    name: 'updateJobResults',
  }),
  graphql(updateStartingIndex, {
    name: 'updateStartingIndex',
  }),
  graphql(resetJobResults, {
    name: 'resetJobResults',
  }),
)(JobList);
