const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devServer: {
		headers: {
			'Access-Control-Allow-Origin': '*'
		}
	},
	devtool: '#source-map',
	entry: ['babel-polyfill','./client/index.js'],
  output: {
		path: __dirname,
		publicPath: '/',
    filename: 'bundle.js'
  },
	module: {
  	rules: [
    	{
				use: 'babel-loader',
				test: /\.js$/,
				exclude: /node_modules/,
      },
			{
				use: ['style-loader','css-loader'],
				test: /\.css$/
			},
			{
				use:['file-loader'],
				test: /\.(png|jpg|gif)$/
			}
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './client/index.html'
		})
	]
}