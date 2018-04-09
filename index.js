'use strict';

const path = require('path');
const {createBundleRenderer} = require('vue-server-renderer');
const express = require('express');
const server = require('express')();
const template = require('fs').readFileSync('./src/index.template.html', 'utf-8');
const serverBundlePath = require.resolve('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundlePath, {
    runInNewContext: false,//每次渲染，创建一个新的V8上下文，开销大
    template,
    clientManifest
});

server.use('/dist', express.static(path.resolve(__dirname, './dist')));

server.get('*', (req, res) => {
    const context = {url: req.url};

    renderer.renderToString(context, (err,html) => { //周期

        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }

        res.end(html);
    });
});

server.listen(8000);