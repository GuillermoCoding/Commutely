const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const suggestionModel = require('./models/suggestion');
const Suggestion = mongoose.model('suggestion');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

app.use(cors(
  {
    origin : 'http://localhost:4000',
    credentials: true
  }
));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/graphql',expressGraphQL({
	schema,
	graphiql: true
}));
mongoose.connect(process.env.JOB_TITLES_DB_URL);
mongoose.connection
	.once('open',()=>console.log('Connected to MongoDB'))
	.on('error',()=>console.log('Error when connecting to database'));



module.exports = app;
