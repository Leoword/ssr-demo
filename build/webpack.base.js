'use strict';

const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    devtool: false,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:8000/dist/',
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
        // new webpack.optimize.ModuleConcatenationPlugin(),
        new FriendlyErrorsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify("5fa3b9"),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: "1+1",
            "typeof window": JSON.stringify("object")
        }),          
        new webpack.HotModuleReplacementPlugin()
        ]
};