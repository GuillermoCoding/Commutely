import React, { Component } from 'react';
import Downshift from 'downshift';
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAddress, updateErrorMessage } from '../mutations';
import { fetchAddress, fetchLocationSuggestions } from '../queries';
import styles from '../styles/LocationSearchBar.css';
import { AutoCompleteSearch, AutoCompleteResults} from '../components';

class LocationSearchBar extends Component {
  constructor(props){
		super(props);
		this.state = {
			address: '',
      results: []
		}
	}
	async onChange(address){
		await this.setState({address});
		await this.props.updateAddress({
			variables: {
				homeAddress: address
			}
		});
		await this.props.updateErrorMessage({
			varibles: {
				content: ''
			}
		});
	}
  async onInputValueChange(address){
    await this.setState({address});
    const results = await this.props.client.query({
                      query: fetchLocationSuggestions,
                      variables: {
                        input: this.state.address
                      }
                    });
    await this.setState({results: results.data.locationSuggestions});
          
  }
	componentWillMount(){
		if (this.props.fetchAddress.address.homeAddress) {
			this.setState({address : this.props.fetchAddress.address.homeAddress});
		}
	}
	render(){
		return (
			<Downshift
			  inputValue={this.state.address}
        onChange={this.onChange.bind(this)}
        onInputValueChange={this.onInputValueChange.bind(this)}
        render={({getInputProps,getItemProps,isOpen, selectedItem,highlightedIndex})=>{
          return (
            <div>
              <AutoCompleteSearch 
								placeholder={'Enter home address...'} 
								getInputProps={getInputProps}
							/>
							<AutoCompleteResults 
								isOpen={isOpen} 
								results={this.state.results} 
								getItemProps={getItemProps}
								highlightedIndex={highlightedIndex}
							/>
            </div>
          );
        }}
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
	}),
  withApollo)
	(LocationSearchBar)