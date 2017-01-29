'use strict';

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './client')
];

module.exports = {
  devtool: 'source-map',
  debug: true,
  entry: [
    // 'react-hot-loader/patch',
    // 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './client/index.dev.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: '[name]-[hash].min.js',
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.jsx?$/,
        include: __dirname + '/client',
        loader: "babel-loader",
        query: {
          presets: ['react', 'latest', 'stage-2']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }, {
        test: /\.(wav|mp3)(\?[a-z0-9]+)?$/,
        loader: "file-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: __dirname }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new CopyWebpackPlugin([{ from: 'client/assets' }]),
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      filename: 'index.html',
      inject: 'body' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
};
