import React, { Component } from 'react';
import Downshift from 'downshift';
import { AutoCompleteList } from './index';
import { updateSearchedJob } from '../mutations';
import { fetchSearchedJob } from '../queries';
import { graphql, compose, withApollo } from 'react-apollo';
import styles from '../styles/JobTitleSearchBar.css';

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
  onInputValueChange(jobTitle){
    await this.setState({jobTitle});  

  }
	componentWillMount(){
		const { title } = this.props.fetchSearchedJob.searchedJob;
		this.setState({jobTitle: title});
	}
  render(){
    return (
      <Downshift
        inputValue={this.state.jobTitle}
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
	graphql(updateSearchedJob,{
		name: 'updateSearchedJob'
	}),
	graphql(fetchSearchedJob,{
		name: 'fetchSearchedJob'
	})
	)(JobTitleSearchBar);