import React, {Component} from 'react';
import { LocationSearchBar } from './components';
import { Button, JobList, JobTitleSearchBar, NavigationFooter } from './containers';

class App extends Component {
	render (){
		return (
			<div>
				<JobTitleSearchBar/>
				<LocationSearchBar/>
				<Button/>
				<JobList/>
				<NavigationFooter/>
			</div>
		);
	}
}

export default App;