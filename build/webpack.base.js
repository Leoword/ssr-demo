'use strict';

const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    devtool: '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            'dist': path.resolve(__dirname, '../dist'),
        }
    },
    module: {
        noParse: /es6-promise\.js$/,
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
          {
            test: /\.styl(us)?$/,
            use: ['vue-style-loader', 'css-loader', 'stylus-loader']
          },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new FriendlyErrorsPlugin()
        ]
};