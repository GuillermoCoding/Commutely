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


function renderIcon(travelMode){
	switch(travelMode){
		case 'Walking': return <WalkingIcon/>;
		case 'Bicycling': return <BikeIcon/>;
		case 'Driving': return <CarIcon/>;
	}	
}

const JobListItem = ({map,job})=> {
		return (
				<Row className={styles.item}>
					<Col xs={12} md={6} lg={6}>
						<h3 className={styles.header}> {job.title}</h3>
						<Row>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><BusinessIcon/> {job.company}</h5>
						</Col>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><LocationIcon/>  {job.address}</h5>
						</Col>
						</Row>
						<Row>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text}><TimeIcon/> {map.travelMode} time : {job.commuteTime}</h5>
						</Col>
						<Col xs={12} md={6} lg={6}>
							<h5 className={styles.text} >{renderIcon(map.travelMode)} {map.travelMode} distance : {job.commuteDistance}</h5>
						</Col>
						</Row>
						<Row>
							<Col xs={12} md={12} lg={12}>
								<p className={styles.snippet}>{job.snippet}</p>
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={12} lg={12}>
								<ViewMoreButton url={job.url}/>
							</Col>
						</Row>	
					</Col>
					
					<Col xs={12} md={6} lg={6}>
						<MapView mapProps={map}/>
					</Col>
				</Row>
		);
}

export default JobListItem;