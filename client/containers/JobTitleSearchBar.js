import React, { Component } from 'react';
import Downshift from 'downshift';
import { AutoCompleteList } from './index';
import { updateSearchedJob } from '../mutations';
import { fetchSearchedJob, fetchJobTitleSuggestions } from '../queries';
import { graphql, compose, withApollo } from 'react-apollo';
import styles from '../styles/JobTitleSearchBar.css';
import { AutoCompleteSearch, AutoCompleteResults} from '../components';

class JobTitleSearchBar extends Component {
	constructor(props){
		super(props);
		this.state = {
			jobTitle:'',
      results: []
		}
	}
	async onChange(jobTitle){
    await this.setState({jobTitle});
    await this.props.updateSearchedJob({
		  variables : {
			  title: jobTitle
			}
		});
	}
  async onInputValueChange(input){
    await this.setState({jobTitle: input});
    if (input.length!=0) {
      const results = await this.props.client.query({
      query: fetchJobTitleSuggestions,
      variables: {
        input
      }

    }); 
    await this.setState({results: results.data.jobTitleSuggestions}); 
    } else {
      await this.setState({results: []}); 
    }
    

  }
	// componentWillMount(){
	// 	const { title } = this.props.fetchSearchedJob.searchedJob;
	// 	this.setState({jobTitle: title});
	// }
  render(){
    return (
      <Downshift
        inputValue={this.state.jobTitle}
        onChange={this.onChange.bind(this)}
        onInputValueChange={this.onInputValueChange.bind(this)}
        render={({getInputProps,getItemProps,isOpen, selectedItem,highlightedIndex})=>{
          console.log(highlightedIndex);
          return (
            <div>
              <AutoCompleteSearch 
								placeholder={'Enter job title...'} 
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
	graphql(updateSearchedJob,{
		name: 'updateSearchedJob'
	}),
	graphql(fetchSearchedJob,{
		name: 'fetchSearchedJob'
	}),
  withApollo
	)(JobTitleSearchBar);