import React, { Component } from 'react';
import Downshift from 'downshift';
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAddress, updateErrorMessage } from '../mutations';
import { fetchAddress, fetchLocationSuggestions } from '../queries';
import { AutoCompleteSearch, AutoCompleteResults} from '../components';

class LocationSearchBar extends Component {
  constructor(props){
		super(props);
		this.state = {
			input: '',
      results: [],
			isLoading: false
		}
	}
	async onChange(input){
		await this.setState({input});
		await this.props.updateAddress({
			variables: {
				homeAddress: input
			}
		});
		await this.props.updateErrorMessage({
			varibles: {
				content: ''
			}
		});
	}
  async onInputValueChange(input){
		await this.setState({isLoading: true});
    await this.setState({input});
    const results = await this.props.client.query({
                      query: fetchLocationSuggestions,
                      variables: {
                        input: this.state.input
                      }
                    });
		await this.setState({isLoading: false});
    await this.setState({results: results.data.locationSuggestions});
          
  }
	componentWillMount(){
		if (this.props.fetchAddress.address.homeAddress) {
			this.setState({input : this.props.fetchAddress.address.homeAddress});
		}
	}
	async onStateChange(data){
    if (data.highlightedIndex!=null) {
      await this.setState({input: this.state.results[data.highlightedIndex]});
    }
  }
	render(){
		return (
			<Downshift
			  inputValue={this.state.input}
        onChange={this.onChange.bind(this)}
				onStateChange={this.onStateChange.bind(this)}
        onInputValueChange={this.onInputValueChange.bind(this)}
        render={({getInputProps,getItemProps,isOpen, selectedItem,highlightedIndex})=>{
          return (
            <div>
              <AutoCompleteSearch 
								heading={'Enter home address'}
								placeholder={'Enter home address...'} 
								getInputProps={getInputProps}
								isLoading={this.state.isLoading}
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