import React, { Component } from 'react';
import Downshift from 'downshift';
import { graphql, compose, withApollo } from 'react-apollo';
import { updateAddress, updateErrorMessage } from '../mutations';
import { fetchAddress, fetchLocationSuggestions } from '../queries';
import styles from '../styles/LocationSearchBar.css';

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
	}
	// async onSelect(address){
	// 	await this.setState({address});
	// 	await this.props.updateErrorMessage({
	// 		variables: {
	// 			content: ''
	// 		}
	// 	});
	// }	
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
              <input className={styles.input}placeholder={'Enter address...'} {...getInputProps()}/>
              {isOpen?(
                <div className={styles.results}>
                  {this.state.results.map((result,index)=>{
                    return (
                      <div 
                        className={styles.item} 
                        key={index}
                        {...getItemProps({item: result})}
                      >
                        {result}
                      </div>
                    );
                  })}  
                </div>
              ):null}
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