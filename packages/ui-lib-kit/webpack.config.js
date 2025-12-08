import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.resolve(__dirname, 'lib')

export default {
	name: 'ui-kit',
	entry: path.resolve(__dirname, './src/index.ts'),
	mode: 'production',
	output: {
		path: buildPath,
		filename: 'index.js',
		library: {
			type: 'umd',
			name: 'uiLibKit',
		},
		globalObject: 'this',
		clean: true,
	},
	plugins: [new MiniCssExtractPlugin({ filename: 'index.css' })].filter(Boolean),
	module: {
		rules: [
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
				test: /\.(png|jpe?g|pdf|mp4|(woff(2)?|ttf|eof)(\?v=\d+\.\d+\.\d+)?$)$/,
				type: 'asset',
				exclude: /node_modules/,
				parser: {
					dataUrlCondition: {
						maxSize: 2 * 1024,
					},
				},
				generator: {
					filename: 'assets/[name].[hash:8][ext]',
				},
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						transpileOnly: true,
					},
				},
			},
			{
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				use: [{ loader: '@svgr/webpack', options: { svgo: false, prettier: false } }],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts'],
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
	},
}
