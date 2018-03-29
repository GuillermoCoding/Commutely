const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(cors());

if (process.env.NODE_ENV=='development') {
	console.log('development set up');
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpack = require('webpack');
	const webpackConfig = require('../webpack.config.js');
	app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
	console.log('production set up');
	app.use(express.static('./'));
	app.get('*',(req, res)=>{
  		res.sendFile(path.resolve(__dirname,'../index.html'));
	});
}
app.use('/graphql',expressGraphQL({
	schema,
	graphiql: true
}));

module.exports = app;
