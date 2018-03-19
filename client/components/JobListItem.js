import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MapView } from './';

class JobListItem extends Component {
	render(){
		return (
				<Row>
					<Col xs={12} md={6} lg={6}>
						<h3>{this.props.job.title}</h3>
						<h5>{this.props.job.company}</h5>
						<h5>{this.props.job.address}</h5>
						<h5>{this.props.mapProps.travelMode} time : {this.props.job.commuteTime}</h5>
						<h5>commute distance : {this.props.job.commuteDistance}</h5>
					</Col>
					<Col xs={12} md={6} lg={6}>
						<MapView mapProps={this.props.mapProps}/>
					</Col>
				</Row>
		);
	}

}

export default JobListItem;