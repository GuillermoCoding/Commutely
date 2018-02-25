const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const jobModel = require('./models/job');
const Job = mongoose.model('job');
const app = express();
app.use(bodyParser.json());

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/graphql',expressGraphQL({
	schema,
	graphiql: true
}));
mongoose.connect('mongodb://localhost:27017/friendly_commute_db');
mongoose.connection
	.once('open',()=>console.log('Connected to MongoDB'))
	.on('error',()=>console.log('Error when connecting to database'));



module.exports = app;
