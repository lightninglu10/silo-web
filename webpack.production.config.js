'use strict';

var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var StatsPlugin = require('stats-webpack-plugin');

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './client')
];

module.exports = {
  entry: [
    './client/index.prod.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: '[name]-[hash].min.js',
    publicPath: '/static',
  },
  module: {
    rules: [
      { test: /\.css$/, 
        loader: "style-loader!css-loader"
      },
      {
        test: /\.jsx?$/,
        include: __dirname + '/client',
        loader: "babel-loader",
        query: {
          presets: ['react', 'latest', 'stage-2'],
          "plugins": ["transform-decorators-legacy"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: sassLoaders.join('!')})
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { root: __dirname }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new CopyWebpackPlugin([{ from: 'client/assets' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.tpl.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    
  ],
};
