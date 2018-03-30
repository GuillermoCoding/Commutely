import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { 
	SubmitButton, 
	JobList, 
	JobTitleSearchBar, 
	LocationSearchBar,
	NavigationFooter, 
	CommuteOptions,
	TimeOptions,
	ErrorMessage
 } from './containers';
import { Phrase } from './components';
import { fetchCommuteOption } from './queries';
import { graphql } from 'react-apollo';
import styles from './styles/App.css';
import carBackground from './images/driving-image.jpg';
import bikeBackground from './images/bicycling-image.jpg';
import walkingBackground from './images/walking-image.jpg';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      backgroundStyle: {
        backgroundImage: ''
      }
    }
  }
  async  componentWillReceiveProps(nextProps){
    const backgroundURL = `./images/${nextProps.data.commuteOption.commuteSelected}-image.jpg`;
		const backgroundStyle = {
			backgroundImage : 'url('+require(''+backgroundURL.toLowerCase())+')'
		};
    await this.setState({backgroundStyle});
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
              <SubmitButton/>
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