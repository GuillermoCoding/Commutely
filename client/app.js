import React, {Component} from 'react';
import { LocationSearchBar } from './components';
import { SubmitButton, JobList, JobTitleSearchBar, NavigationFooter } from './containers';

class App extends Component {
	render (){
		return (
			<div>
				<JobTitleSearchBar/>
				<LocationSearchBar/>
				<SubmitButton/>
				<JobList/>
				<NavigationFooter/>
			</div>
		);
	}
}

export default App;