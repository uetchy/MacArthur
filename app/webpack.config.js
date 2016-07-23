const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
	devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
	entry: './lib/index.js',
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loaders: [
					'babel-loader'
				]
			},
			{
				test: /\.json/,
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new webpack.ExternalsPlugin('commonjs', ['electron']),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(nodeEnv)
			}
		})
	]
};
