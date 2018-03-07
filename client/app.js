import React, {Component} from 'react';
import SearchBar from './components/search_bar';
import JobList from './containers/job_list';
import Button from './containers/button';
import AddressSearch from './components/address_search';

class App extends Component {
	render (){
		return (
			<div>
				<SearchBar/>
				<AddressSearch/>
				<Button/>
				<JobList/>
			</div>
		);
	}
}

export default App;