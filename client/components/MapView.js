import React, {Component} from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import axios from 'axios';
import { 
	withScriptjs, 
	withGoogleMap, 
	GoogleMap, 
	DirectionsRenderer 
} from 'react-google-maps';
import styles from '../styles/MapView.css';

const MapWithDirectionsRenderer = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div className={styles.map}/>,
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
        console.log(status);
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
)((props)=>{
	const markerOptions = {
		draggable : true
	};
	return (
		<GoogleMap
			defaultZoom={7}
			defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
		>
		{props.directions && <DirectionsRenderer directions={props.directions} markerOptions={markerOptions}/>}
		</GoogleMap>
	);


}
);



const MapView = ({mapProps})=>{
	return(
		<MapWithDirectionsRenderer mapProps={mapProps}/>
	);
}


export default MapView;