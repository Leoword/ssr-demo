'use strict';

const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base');
const VueSSRServicePlugin = require('vue-server-renderer/server-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
    entry: {
        app: path.resolve(__dirname, '../src/entry-service.js')
    },
    target: 'node',
    output: {
        libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
        whitelist: /\.css$/
    }),
    plugins: [
        new VueSSRServicePlugin()
    ]
});