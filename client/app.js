import React, { Component } from 'react';
import { LocationSearchBar } from './components';
import { 
	SubmitButton, 
	JobList, 
	JobTitleSearchBar, 
	NavigationFooter, 
	CommuteOptions,
	TimeOptions
 } from './containers';

class App extends Component {
	render (){
		return (
			<div id='panel'>
				<h6>Enter job title:</h6>
				<JobTitleSearchBar/>
				<h6>Enter home address: (must be full address for acurate results)</h6>
				<LocationSearchBar/>
				<h6>Please choose how you would like to commute</h6>
				<CommuteOptions/>
				<h6>On average, How much time would you like to spend commuting to work?</h6>
				<h6>minutes</h6>
				<TimeOptions/>
				<SubmitButton/>
				<JobList/>
				<NavigationFooter/>
				
			</div>
		);
	}
}

export default App;