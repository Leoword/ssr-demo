'use strict';

const path = require('path');
const {createBundleRenderer} = require('vue-server-renderer');
const express = require('express');
const server = require('express')();
const template = require('fs').readFileSync('./src/index.template.html', 'utf-8');
const serverBundlePath = require.resolve('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const LRU = require('lru-cache');

const renderer = createBundleRenderer(serverBundlePath, {
    //组件级别缓存(没弄明白)
    cache: LRU({
        max: 100,
        maxAge: 100000
    }),
    runInNewContext: false,//每次渲染，创建一个新的V8上下文，开销大
    template,
    clientManifest
});

server.use('/dist', express.static(path.resolve(__dirname, './dist')));

//页面级别缓存
const pageCache = LRU({
    max: 100,
    maxAge: 100000
});

const isCacheable = req => {
    // if(req.query) {
    //     return false;
    // }

    return true;
}
server.get('*', (req, res) => {
    const cacheable = isCacheable(req);

    if (cacheable) {
        const page = pageCache.get(req.url);
        if (page) {
            return res.end(page);
        }
    }

    const context = {url: req.url};

    renderer.renderToString(context, (err,html) => { //周期

        if (err) {
            res.status(500).end('Internal Server Error');
            return;
        }

        res.end(html);

        if (cacheable) {
            pageCache.set(req.url, html);

            console.log(pageCache);
        }
    });
});

server.listen(8000);