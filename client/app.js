import React, { Component } from 'react';
import { LocationSearchBar } from './components';
import { SubmitButton, JobList, JobTitleSearchBar, NavigationFooter, CommuteOptions } from './containers';

class App extends Component {
	render (){
		return (
			<div>
				<h6>Enter job title:</h6>
				<JobTitleSearchBar/>
				<h6>Enter home address: (must be full address for acurate results)</h6>
				<LocationSearchBar/>
				<SubmitButton/>
				<JobList/>
				<NavigationFooter/>
				<CommuteOptions/>
			</div>
		);
	}
}

export default App;