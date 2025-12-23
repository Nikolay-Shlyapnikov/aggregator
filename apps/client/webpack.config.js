import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
	mode: 'development',
	entry: path.resolve(__dirname, 'src/index.tsx'),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
						compilerOptions: {
							module: 'esnext'
						}
					}
				},
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				exclude: /\.module\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
							},
						},
					},
					'less-loader',
				],
			},
			{
				test: /\.module\.(?:le|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: '[path][name]__[local]',
							},
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['autoprefixer'],
							},
						},
					},
					'less-loader',
				],
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
		alias: {
			assets: path.resolve(__dirname, 'src/assets'),
			// Добавьте это для абсолютных путей
			'@': path.resolve(__dirname, 'src'),
		},
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	output: {
		filename: '[name].js',
		publicPath: '/',
		path: path.resolve(__dirname, 'static'),
		clean: true,
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				uiLib: {
					name: 'ui-lib-kit',
					test: /[\\/]node_modules[\\/]ui-lib-kit[\\/]/,
					chunks: 'all',
					priority: 20,
				},
				mainStyles: {
					name: 'main',
					test: /[\\/]packages[\\/](?!ui-lib-kit[\\/]).*\.(scss|css)$/,
					enforce: true,
					priority: 10,
				},
				default: {
					name: 'main',
					chunks: 'all',
					enforce: true,
					priority: 5,
				},
			},
		},
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'static'),
		},
		hot: true,
		port: 3000,
		historyApiFallback: {
			index: '/index.html',
			disableDotRule: true,
		},
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				secure: false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '',
				},
			},
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			template: '../../public/index.html',
			publicPath: '/',
		}),
	],
}
