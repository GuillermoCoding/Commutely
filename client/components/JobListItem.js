import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MapView } from './';
import styles from '../styles/JobListItem.css';
import { ViewMoreButton } from './';
import LocationIcon from 'react-icons/lib/md/location-on';
import BusinessIcon from 'react-icons/lib/md/business';
import TimeIcon from 'react-icons/lib/md/access-time';
import WalkingIcon from 'react-icons/lib/md/directions-walk';
import BikeIcon from 'react-icons/lib/md/directions-bike';
import CarIcon from 'react-icons/lib/md/directions-car';
class JobListItem extends Component {

	render(){
		return (
				<Row className={styles.item}>
					<Col xs={12} md={6} lg={6}>
						<h3>{this.props.job.title}</h3>
						<h5><BusinessIcon/> {this.props.job.company}</h5>
						<h5><LocationIcon/>  {this.props.job.address}</h5>
						<h5><TimeIcon/> {this.props.mapProps.travelMode} time : {this.props.job.commuteTime}</h5>
						<h5>Commute distance : {this.props.job.commuteDistance}</h5>
						<ViewMoreButton url={this.props.job.url}/>
					</Col>
					<Col xs={12} md={6} lg={6}>
						<MapView mapProps={this.props.mapProps}/>
					</Col>
				</Row>
		);
	}

}

export default JobListItem;