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
	renderIcon(){
		const travelMode = this.props.mapProps.travelMode;
		switch(travelMode){
			case 'Walking': return <WalkingIcon/>;
			case 'Bicycling': return <BikeIcon/>;
			case 'Driving': return <CarIcon/>;
		}
	}
	render(){
		return (
				<Row className={styles.item}>
					<Col xs={12} md={6} lg={6}>
						<h3 className={styles.header}> {this.props.job.title}</h3>
						<Row>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><BusinessIcon/> {this.props.job.company}</h5>
						</Col>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><LocationIcon/>  {this.props.job.address}</h5>
						</Col>
						</Row>
						<Row>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><TimeIcon/> {this.props.mapProps.travelMode} time : {this.props.job.commuteTime}</h5>
						</Col>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text} >{this.renderIcon()} {this.props.mapProps.travelMode} distance : {this.props.job.commuteDistance}</h5>
						</Col>
						</Row>
						<Row>
							<Col xs={12} md={12} lg={12}>
								<p className={styles.snippet}>{this.props.job.snippet}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={12} lg={12}>
								<ViewMoreButton url={this.props.job.url}/>
							</Col>
						</Row>	
					</Col>
					
					<Col xs={12} md={6} lg={6}>
						<MapView mapProps={this.props.mapProps}/>
					</Col>
				</Row>
		);
	}

}

export default JobListItem;