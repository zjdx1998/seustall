const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

let cleanPath = ['dist'];
let cleanOpinions = {
	root: path.resolve(__dirname),
	verbose: true,
	dry: false
}

module.exports = {
	resolve:
	{
			extensions:['.js','.ts','.json','tsx']
	},
	devtool: 'source-map',
	mode: 'development',
	entry: {
		index:'./src/index.ts'
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude:/node_modules/
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		// new webpack.HashedModuleIDsPlugin(),
		new webpack.ProvidePlugin({
			lod:'lodash'
		}),
		// new webpack.DefinePlugin({ "global.GENTLY": false })
	],
	target:"node",

};
