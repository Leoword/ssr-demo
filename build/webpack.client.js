'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, '../src/entry-client.js'),
    plugins: [
        new VueSSRClientPlugin()
    ]
});