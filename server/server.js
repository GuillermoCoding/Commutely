const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const suggestionModel = require('./models/suggestion');
const Suggestion = mongoose.model('suggestion');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

app.use(webpackMiddleware(webpack(webpackConfig)));

app.use('/graphql',expressGraphQL({
	schema,
	graphiql: true
}));

// app.use(express.static('./'));
app.get('*',(req, res)=>{
  res.sendFile(path.resolve(__dirname,'../index.html'));
});
console.log(process.env.SUGGESTIONS_DB);
mongoose.connect(process.env.SUGGESTIONS_DB);
mongoose.connection
	.once('open',()=>console.log('Connected to MongoDB'))
	.on('error',()=>console.log('Error when connecting to database'));



module.exports = app;
