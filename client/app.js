import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { 
	JobList, 
	JobTitleSearchBar, 
	LocationSearchBar,
	NavigationFooter, 
	CommuteOptions,
	ErrorMessage
 } from './containers';
import { Phrase } from './components';
import { SearchButton } from './containers';
import { fetchCommuteOption } from './queries';
import { graphql } from 'react-apollo';
import styles from './styles/App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundStyle: {
        backgroundImage: ''
      }
    }
  }
  static getDerivedStateFromProps(nextProps,prevState){
    console.log('getDerivedStateFromProps');
    const backgroundURL = `./images/${nextProps.data.commuteOption.commuteSelected}-image.jpg`;
    return {
      backgroundStyle: {
        backgroundImage: 'url('+require(''+backgroundURL.toLowerCase())+')'
      }
    }
  }
  render (){
    return (
      <div style={this.state.backgroundStyle} className={styles.container}>
        <Grid>
          <Row>
            <Col xs={12} sm={12}md={12} lg={6} lgPush={6}>
              <Phrase text={'Daily Commute helps you find jobs that fit your commuting lifestyle'}/>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} lgPull={6}>
              <JobTitleSearchBar/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <LocationSearchBar/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <CommuteOptions/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={6} lg={6}>
              <ErrorMessage/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default graphql(fetchCommuteOption)(App);
