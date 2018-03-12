import React, {Component} from 'react';
import { LocationSearchBar } from './components';
import { Button, JobList, JobTitleSearchBar } from './containers';

class App extends Component {
	render (){
		return (
			<div>
				<JobTitleSearchBar/>
				<LocationSearchBar/>
				<Button/>
				<JobList/>
			</div>
		);
	}
}

export default App;