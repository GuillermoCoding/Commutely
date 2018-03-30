import React, { Component } from 'react';
import Downshift from 'downshift';
import { AutoCompleteList } from './index';
import { updateSearchedJob, updateErrorMessage } from '../mutations';
import { fetchSearchedJob, fetchJobTitleSuggestions } from '../queries';
import { graphql, compose, withApollo } from 'react-apollo';
import { AutoCompleteSearch, AutoCompleteResults} from '../components';

class JobTitleSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			input:'',
      results: [],
      isloading: false
		}
	}
  async onChange(input){
    await this.props.updateSearchedJob({
		  variables : {
			  title: input
			}
		});
    await this.props.updateErrorMessage({
			  varibles: {
				  content: ''
			  }
		  });
	}
  async onInputValueChange(input){
      await this.setState({input});
      if (input.length!=0) {
        await this.setState({isLoading: true});
        const results = await this.props.client.query({
          query: fetchJobTitleSuggestions,
          variables: {
            input
          }
        }); 
        await this.setState({isLoading: false});
        await this.setState({results: results.data.jobTitleSuggestions}); 
      } else {
        await this.setState({results: []});
      }
  }
	async componentWillMount(){
		const { title } = this.props.fetchSearchedJob.searchedJob;
		await this.setState({input: title});
	}
  async onStateChange(data){
    if (data.highlightedIndex!=null) {
      await this.setState({input: this.state.results[data.highlightedIndex]});
    }
  }

  async onOuterClick({inputValue}){
    await this.setState({input: inputValue});
    await this.props.updateSearchedJob({
      variables: {
        title: inputValue
      }
    });
    await this.props.updateErrorMessage({
			  varibles: {
				  content: ''
			  }
		});
  }

  render(){
    return (
      <Downshift
        onStateChange={this.onStateChange.bind(this)}
        onOuterClick={this.onOuterClick.bind(this)}
        inputValue={this.state.input}
        onChange={this.onChange.bind(this)}
        onInputValueChange={this.onInputValueChange.bind(this)}
        render={({getInputProps,getItemProps,isOpen, selectedItem,highlightedIndex})=>{
        
          return (
            <div>
              <AutoCompleteSearch 
                heading={'Enter job title (Optional)'}
								placeholder={'Enter job title...'} 
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
	graphql(updateSearchedJob,{
		name: 'updateSearchedJob'
	}),
	graphql(fetchSearchedJob,{
		name: 'fetchSearchedJob'
	}),
  graphql(updateErrorMessage,{
    name:'updateErrorMessage'
  }),
  withApollo
	)(JobTitleSearchBar);