import React, { Component } from 'react';
import Downshift from 'downshift';
import ResultList from './result_list';

class SearchBar extends Component {
	render(){
		return (
			<Downshift
				onChange={selectedItem=>console.log(selectedItem)}
				render={({inputValue, getInputProps, isOpen, getItemProps, highlightedIndex,selectedItem})=>(
					<div>
						<input {...getInputProps()}/>
						{isOpen ? (			
							<ResultList 
								getItemProps={getItemProps} 
								inputValue={inputValue}
								highlightedIndex={highlightedIndex}
								selectedItem={selectedItem}
							/>
						): null}
					</div>
					
				)}
			/>
		
		);
	}

}

export default SearchBar;