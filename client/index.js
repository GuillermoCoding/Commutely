import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';

const Root = ()=>{
	return (
			<h1>Hello World</h1>
  );
};

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);