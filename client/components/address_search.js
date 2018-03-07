import React, { Component } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {graphql} from 'react-apollo';
import updateAddress from '../mutations/updateAddress';

class AddressSearch extends Component {
	constructor(props){
		super(props);
		this.state = {
			address: ''
		}
		this.onChange = (address=> this.setState({address}))
	}
	
	async onSelect(data){
		const result = await geocodeByAddress(this.state.address);
		const {lat, lng } = await getLatLng(result[0]);
		const {address_components} = result[0];
		const zipcode = this.getZipCode(address_components);
		const address = {lat,lng, zipcode};
		this.props.updateAddress({
			variables: {
				address
			}
		});
	}	
	getZipCode(addressComponents){
		for (let i =addressComponents.length-1; i >= 0; i--) {
			if (addressComponents[i].types.length==1 && addressComponents[i].types[0]=='postal_code') {
				return addressComponents[i].long_name;
			}
		}
	}
	render(){
		const renderSuggestion = ({formattedSuggestion}) => (
			<div>
				<strong>{formattedSuggestion.mainText}</strong>{' '}
				<small>{formattedSuggestion.secondaryText}</small>
			</div>
		);

		const inputProps = {
			value : this.state.address,
			onChange : this.onChange
		}
		
		return (
				<PlacesAutoComplete 
					inputProps={inputProps} 
					renderSuggestion={renderSuggestion}
					onSelect={this.onSelect.bind(this)}
				/>
		);
	}
}
export default graphql(updateAddress,{name:'updateAddress'})(AddressSearch);