const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = (env) => {
	const isDev = env.mode === 'development';
	const isPreview = env.mode === 'preview';

	return {
		mode: isDev ? 'development' : 'production',
		entry: './src/main.tsx',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
			publicPath: '/',
		},
		devtool: isDev || isPreview ? 'inline-source-map' : false,
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@styles': path.resolve(__dirname, 'src/styles/'),
				'@components': path.resolve(__dirname, 'src/components/'),
				'@hooks': path.resolve(__dirname, 'src/hooks/'),
				'@utils': path.resolve(__dirname, 'src/utils/'),
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [autoprefixer()],
								},
							},
						},
						{
							loader: 'sass-loader',
							options: {
								additionalData: '',
								sassOptions: {
									includePaths: [path.resolve(__dirname, 'src')],
								},
							},
						},
					],
				},
				{
					test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
					type: 'asset/resource',
				},
			],
		},
		optimization: {
			minimizer: ['...', new CssMinimizerPlugin()],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				minify: false,
				publicPath: '/',
			}),
			new Dotenv(),
			new MiniCssExtractPlugin({
				filename: isDev ? '[name].css' : '[name].[contenthash].css',
			}),
		],
		devServer: {
			static: './dist',
			historyApiFallback: true,
			hot: true,
			open: false,
			port: 5731,
		},
	};
};
