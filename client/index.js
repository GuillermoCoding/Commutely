import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { HomeNavBar } from './components';
import {SubmitButton, JobList} from './containers';
import fetch from 'unfetch';
import _ from 'lodash';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { 
	address, 
	jobList, 
	searchedJob, 
	commuteOption, 
	timeOption
} from './resolvers';

const cache = new InMemoryCache();
const stateLink = withClientState({
	cache,
	..._.merge(searchedJob,jobList,address,commuteOption,timeOption)
	
});
const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		stateLink,
		new HttpLink({
			uri: 'http://localhost:4000/graphql',fetch:fetch
		}),
	]),
	cache
});

const Root = ()=>{
	return (
		<ApolloProvider client={apolloClient}>
			<Router history={browserHistory}>
				
				
				<Route path='/' components={HomeNavBar}>
					<IndexRoute component={App}/>
					<Route path='/results' components={JobList}/>
				</Route>
				
			</Router>
		</ApolloProvider>
  );
};

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);