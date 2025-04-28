import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  mode: 'development',
  entry: './src/app/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)?$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-modules-typescript-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          { loader: 'sass-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
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
        uiLibStyles: {
          name: 'ui-lib',
          test: /[\\/]src[\\/]ui-lib[\\/].*\.(scss|css)$/,
          enforce: true,
          priority: 20,
        },
        mainStyles: {
          name: 'main',
          test: /[\\/]src[\\/](?!ui-lib[\\/]).*\.(scss|css)$/,
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
      template: './public/index.html',
      publicPath: '/',
    }),
  ],
}
