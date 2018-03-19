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
		googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyA6oWSrlXFahsT5ezn6zRb-N3IcMrhavVg&libraries=geometry,drawing,places',
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `400px` }} />,
		mapElement: <div style={{ height: `100%` }} />,
	}),
	withScriptjs,
	withGoogleMap,
	lifecycle({
		async componentDidMount(){
			const { homeAddress, companyAddress, travelMode } = this.props.mapProps;
			const DirectionsService = new google.maps.DirectionsService();
			DirectionsService.route({
				origin: homeAddress,
				destination: companyAddress,
				travelMode: travelMode.toUpperCase(),
			},(result,status)=>{
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



const MapView = ({mapProps})=>{
	return(
		<MapWithDirectionsRenderer mapProps={mapProps}/>
	);
}


export default MapView;