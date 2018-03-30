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
import { fetchCommuteOption } from './queries';
import { graphql } from 'react-apollo';
import styles from './styles/App.css';
import carBackground from './images/driving-image.jpg';
import bikeBackground from './images/bicycling-image.jpg';
import walkingBackground from './images/walking-image.jpg';
class App extends Component {

	render (){
		const imageURL = './images/'+this.props.data.commuteOption.commuteSelected+'-image.jpg';
		const backgroundStyle = {
			backgroundImage : 'url('+require(''+imageURL.toLowerCase())+')'
		}
		return (
				<div style={backgroundStyle} className={styles.container}>
					<Grid>
						<Row>
							<Col xs={12} sm={12}md={12} lg={6} lgPush={6}>
									<h6 className={styles.phrase}>Daily Commute helps you find jobs that meet your desired commuting style</h6>
							</Col>
							<Col xs={12} sm={12} md={12} lg={6} lgPull={6}>
									<h6 className={styles.text}>Enter job title (Optional)</h6>
									<JobTitleSearchBar/>
							</Col>
						</Row>
						<Row>
							<Col xs={12} sm={12} md={12} lg={6}>
										<h6 className={styles.text}>Enter home address (Full address is required)</h6>
										<LocationSearchBar/>
							</Col>
						</Row>
						<Row className={styles.subContainer}>
							<Col xs={12} md={6} lg={6}>
								<h6 className={styles.text}>How you would like to commute?</h6>
								<CommuteOptions/>
							</Col>
							<Col xs={12} md={6} lg={6}>
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