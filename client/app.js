import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { graphql, compose } from 'react-apollo';
import {
  SearchButton,
  JobTitleSearchBar,
  LocationSearchBar,
  CommuteOptions,
  ErrorMessage,
} from './containers';
import { Phrase } from './components';
import { fetchCommuteOption, fetchErrorMessage } from './queries';
import styles from './styles/App.css';

class App extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.fetchErrorMessage.errorMessage.content) {
      const { content } = nextProps.fetchErrorMessage.errorMessage;
      newState.errorMessage = { content };
    }
    const backgroundURL = `./images/${nextProps.fetchCommuteOption.commuteOption.commuteSelected}-image.jpg`;
    newState.backgroundStyle = {
      backgroundImage: `url(${require(`${backgroundURL.toLowerCase()}`)})`,
    };
    return newState;
  }
  constructor(props) {
    super(props);
    this.state = {
      backgroundStyle: {
        backgroundImage: '',
      },
      errorMessage: {
        content: '',
      },
    };
  }
  render() {
    return (
      <div style={this.state.backgroundStyle} className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12} sm={12}md={12} lg={6} lgPush={6}>
              <Phrase text="Daily Commute helps you find jobs that fit your commuting lifestyle" />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} lgPull={6}>
              <JobTitleSearchBar />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <LocationSearchBar />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <CommuteOptions />
            </Col>
            <Col xs={12} md={12} lg={6}>
              <SearchButton />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <ErrorMessage content={this.state.errorMessage.content} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default compose(
  graphql(fetchCommuteOption, {
    name: 'fetchCommuteOption',
  }),
  graphql(fetchErrorMessage, {
    name: 'fetchErrorMessage',
  }),
)(App);
