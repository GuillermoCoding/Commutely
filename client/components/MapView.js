import React, {Component} from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import axios from 'axios';
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	DirectionsRenderer 
} from 'react-google-maps';

const MapWithDirectionsRenderer = compose(
	withProps({
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDpMxCcDWygwE7_J6zgU_A6rh4ASsRu5rM&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		async componentDidMount(){
			console.log(this.props.destinationProps);
			const {company, city, state } = this.props.destinationProps;
			const DirectionsService = new google.maps.DirectionsService();
			DirectionsService.route({
				origin: new google.maps.LatLng(41.8507300, -87.6512600),
				destination: new google.maps.LatLng(41.8525800, -87.6514100),
				travelMode: google.maps.TravelMode.DRIVING,
			},(result,status)=>{
				console.log(result);
				if (status == google.maps.DirectionsStatus.OK) {
					this.setState({
						directions: result
					});
				} else {
					console.log('error fetching directions');
				}
			});
		}
	})
)(props=>
	<GoogleMap
		defaultZoom={7}
		defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
	>
	{props.directions && <DirectionsRenderer directions={props.directions}/>}
	</GoogleMap>
);



const MapView = ({destinationProps})=>{
	return(
		<MapWithDirectionsRenderer destinationProps={destinationProps}/>
	);
}


export default MapView;