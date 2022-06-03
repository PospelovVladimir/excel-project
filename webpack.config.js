const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const fileName = ext => (isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`);
const jsLoaders = () => {
	let loaders = [
		{
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	];

	if (isDev) {
		loaders.push('eslint-loader');
	}

	return loaders;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: mode,
	// mode: 'development',
	entry: './index.js',
	output: {
		filename: fileName('js'),
		// path: path.resolve(__dirname, 'dist'),
		clean: true
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			// import ../../../../Component
			'@': path.resolve(__dirname, 'src'),
			'@core': path.resolve(__dirname, 'src/core')
		}
	},
	devtool: isDev ? 'source-map' : false,
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				extractComments: false
			})
		]
	},
	devServer: {
		open: true,
		static: {
			directory: './src',
			watch: true
		}
		// devMiddleware: {
		//   writeToDisk: true
		// }
	},
	plugins: [
		// new CopyWebpackPlugin({
		//   patterns: [{
		//     from: path.resolve(__dirname, 'src/favicon.ico'),
		//     to: path.resolve(__dirname, 'dist')
		//   }]
		// }),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: 'body',
			scriptLoading: 'blocking'
			// minify: false
			// minify: {
			//   removeComments: isProd,
			//   collapseWhitespace: isProd
			// }
		}),
		new MiniCssExtractPlugin({
			filename: fileName('css')
		})
	],
	module: {
		rules: [
			{
				test: /\.html$/i,
				use: 'html-loader'
			},
			// {
			//   test: /\.css$/i,
			//   use: 'css-loader'
			// },
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					// style-loader -> inline in html, MiniCssExtractPlugin.loader -> file in html
					// (isDev) ? "style-loader" : MiniCssExtractPlugin.loader,
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env',
										{
											// Options
										}
									]
								]
							}
						}
					},
					'sass-loader'
				]
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: jsLoaders()
			}
		]
	}
};
