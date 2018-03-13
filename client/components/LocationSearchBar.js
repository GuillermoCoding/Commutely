import React, { Component } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { graphql } from 'react-apollo';
import { updateAddress } from '../mutations';

class LocationSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			address: ''
		}
		this.onChange = (address => this.setState({address}))
	}
	
	async onSelect(data){
		await this.setState({address:data});
		const result = await geocodeByAddress(this.state.address);
		const {lat, lng } = await getLatLng(result[0]);
		const {address_components} = result[0];
		const zipcode = this.getZipCode(address_components);
		this.props.updateAddress({
			variables: {
				lat,
				lng,
				zipcode,
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
export default graphql(updateAddress,{name:'updateAddress'})(LocationSearchBar);