import React, { Component } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAddress, updateErrorMessage } from '../mutations';
import { fetchAddress } from '../queries';
import styles from '../styles/LocationSearchBar.css';

class LocationSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			address: ''
		}
	}
	async onChange(address){
		this.setState({address});
		await this.props.updateAddress({
			variables: {
				homeAddress: address
			}
		});
	}
	async onSelect(data){
		await this.setState({address:data});
		const result = await geocodeByAddress(this.state.address);
		const {address_components} = result[0];
		const city = this.getCity(address_components);
		const state = this.getState(address_components);
		await this.props.updateAddress({
				variables: {
					homeAddress : this.state.address,
					city,
					state
				}
		});
		await this.props.updateErrorMessage({
			variables: {
				content: ''
			}
		});

	}	
	getCity(addressComponents){
		for (let i =0; i < addressComponents.length; i++){
			const component = addressComponents[i];
			if (component.types.includes('locality')){
				return component.long_name;
			}
		}
	}
	getState(addressComponents){
		for (let i =0; i < addressComponents.length; i++){
			const component = addressComponents[i];
			if (component.types.includes('administrative_area_level_1')){
				return component.short_name;
			}
		}
	}
	getZipCode(addressComponents){
		for (let i =addressComponents.length-1; i >= 0; i--) {
			if (addressComponents[i].types.length==1 && addressComponents[i].types[0]=='postal_code') {
				return addressComponents[i].long_name;
			}
		}
	}
	componentWillMount(){
		if (this.props.fetchAddress.address.homeAddress) {
			this.setState({address : this.props.fetchAddress.address.homeAddress});
		}
	}
	render(){
		const renderSuggestion = ({formattedSuggestion}) => (
			<div className={styles.item}>
				{formattedSuggestion.mainText}{' '}
				{formattedSuggestion.secondaryText}
			</div>
		);
		const inputProps = {
			value : this.state.address,
			onChange : this.onChange.bind(this),
			
		}
		const styles = {
			autocompleteContainer: {
				zIndex: 1
			},
			autocompleteItem: {
				borderBottom: 'solid rgb(64, 64, 64) 1px'
			}
		}
		return (
					<PlacesAutoComplete
						className={styles.input}
						styles={styles}
						inputProps={inputProps} 
						renderSuggestion={renderSuggestion}
						debounce={1000}
						onSelect={this.onSelect.bind(this)}
					/>
		);
	}
}
export default compose(
	graphql(updateAddress,{
		name: 'updateAddress'
	}),
	graphql(fetchAddress,{
		name: 'fetchAddress'
	}),
	graphql(updateErrorMessage,{
		name: 'updateErrorMessage'
	}))
	(LocationSearchBar)