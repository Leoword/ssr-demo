'use strict';

const path = require('path');
const {createBundleRenderer} = require('vue-server-renderer');
const express = require('express');
const server = require('express')();
const LRU = require('lru-cache');
const templatePath = path.resolve(__dirname, './src/index.template.html');

let renderer;
let readyPromise;
const pageCache = LRU({
    max: 100,
    maxAge: 100000
});

const isCacheable = req => {

    return true;
}

if (false) {

    const serverBundlePath = require.resolve('./dist/vue-ssr-server-bundle.json');
    const clientManifest = require('./dist/vue-ssr-client-manifest.json');
    const template = require('fs').readFileSync(templatePath, 'utf-8');

    renderer = createBundleRenderer(serverBundlePath, {
        runInNewContext: false,//每次渲染，创建一个新的V8上下文，开销大
        template,
        clientManifest
    });

 

} else {
    const readyPromise = require('./build/dev-server')(
        server,
        templatePath,
        (bundle, options) => {
            renderer = createBundleRenderer(bundle, options);
        }
    );
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

    renderer.renderToString(context, (err,html) => { //周期 会话级或者一直存在

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

server.use('/dist', express.static(path.resolve(__dirname, './dist')));

//页面级别缓存


server.listen(8000);