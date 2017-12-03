const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const APP_FOLDER = 'app';
const INIT_FILE = 'initialize.js';
const BUILD_DIR = 'dist';
const isProduction = process.env.NODE_ENV === 'production'

const plugins = () => {
  if(isProduction) {
    return [
      new ExtractTextPlugin({
        filename: 'styles/main.[hash:6].css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ]
  }

  return [
    new webpack.HotModuleReplacementPlugin({multiStep: true})
  ]
}

const config = {
  entry: {
    app: path.join(__dirname, APP_FOLDER, INIT_FILE)
  },
  output: {
    path: path.join(__dirname, BUILD_DIR),
    filename: '[name].[hash:6].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    //stats: 'errors-only',
  },
  watchOptions: {
    // Delay the rebuild after the first change
    aggregateTimeout: 300,
    // Poll using interval (in ms, accepts boolean too)
    poll: 1000
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test:  /\.s?css$/,
        loaders: isProduction ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true,
            }
          },
            {
              loader: 'sass-loader'
            }]
        }): ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['syntax-object-rest-spread']
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ico)$/,
        loader: 'url-loader',
        options: { name: '[hash].[ext]', limit: 10000},
        include: path.join(__dirname, APP_FOLDER)
      }
    ]
  },
  resolve: {
    modules: [
      'app',
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [... plugins(),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      hash: true,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
};

module.exports = config;
