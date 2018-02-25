import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';

const networkInterface = createNetworkInterface({
	uri: 'http://localhost:4000/graphql'
});
const apolloClient = new ApolloClient({
	networkInterface
});

const store = createStore(reducers);

const Root = ()=>{
	return (
		<Provider store={store}>
		<ApolloProvider client={apolloClient}>
			<SearchBar/>
		</ApolloProvider>
		</Provider>
  );
};

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);