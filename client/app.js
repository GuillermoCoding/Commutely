import React, { Component } from 'react';
import { LocationSearchBar } from './components';
import { SubmitButton, JobList, JobTitleSearchBar, NavigationFooter, CommuteOptions } from './containers';

class App extends Component {
	render (){
		return (
			<div>
				<JobTitleSearchBar/>
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