import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import fetch from 'unfetch';
import App from './app';
import { HomeNavBar } from './components';
import { JobList, LoadMoreButton } from './containers';
import linkState from './linkState';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: linkState.defaults,
  resolvers: linkState.resolvers,
});
const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    stateLink,
    new HttpLink({
      uri: `${process.env.HOST_URL}/graphql`, fetch,
    }),
  ]),
  cache,
});

const Root = () => (
  <ApolloProvider client={apolloClient}>
    <Router history={browserHistory}>
      <Route path="/" components={HomeNavBar}>
        <IndexRoute component={App} />
        <Route path="/results" components={JobList}>
          <IndexRoute component={LoadMoreButton} />
        </Route>
      </Route>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
