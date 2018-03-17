import React, { Component } from 'react';
import { LocationSearchBar } from './components';
import { Grid, Row, Col } from 'react-bootstrap';
import { 
	SubmitButton, 
	JobList, 
	JobTitleSearchBar, 
	NavigationFooter, 
	CommuteOptions,
	TimeOptions
 } from './containers';
import { fetchCommuteOption } from './queries';
import { graphql } from 'react-apollo';
import styles from './styles/App.css';
import carBackground from './images/driving-image.jpg';
import bikeBackground from './images/biking-image.jpg';
import walkingBackground from './images/walking-image.jpg';

class App extends Component {

	render (){
		console.log('app render!');
		console.log(this.props.data.commuteOption.commuteSelected);
		const imageURL = './images/'+this.props.data.commuteOption.commuteSelected+'-image.jpg';
		console.log(imageURL);
		const backgroundStyle = {
			backgroundImage : 'url('+require(''+imageURL)+')'
		}
		return (
			<div >
			{this.props.children}
				
				<div style={backgroundStyle} className={styles.container}>
					<Grid>
						<Row className={styles.upper}>
							<Col xs={12} md={6} lg={6}>
									<h6 className={styles.text}>Enter job title:</h6>
									<JobTitleSearchBar/>
							</Col>

							<Col xs={12} md={6} lg={6}>
									<h6 className={styles.text}>Enter home address (Full address is required)</h6>
									<LocationSearchBar/>
							</Col>
						</Row>
						<Row className={styles.lower}>
							<Col xs={12} md={6} lg={6}>
									<h6 className={styles.text}>How you would like to commute?</h6>
									<CommuteOptions/>
							</Col>
							<Col xs={12} md={6} lg={6}>
									<h6 className={styles.text}>On average, How many minutes would you like to spend commuting to work? (One-way)</h6>
									<TimeOptions/>
							</Col>
						</Row>
				
					</Grid>
					<SubmitButton/>
				</div>
			</div>
		);
	}
}

export default graphql(fetchCommuteOption)(App);