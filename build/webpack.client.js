'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const path = require('path');

module.exports = merge(baseConfig, {
    entry: {
        app: path.resolve(__dirname, '../src/entry-client.js')
    },
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.runtime.min.js'
        }
    },
    plugins: [
        new VueSSRClientPlugin()
    ]
});