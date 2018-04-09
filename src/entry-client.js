'use strict';

import { createApp } from './app';
import Vue from 'vue';

import Router from 'vue-router';
Vue.use(Router);

const { app, router, store } = createApp();

//客户端，在挂载之前，store就应该获取到状态

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
import Foo from './components/Foo.vue';

const clientRouter = new Router({
    routes: [
        {
            path: '/foo',
            component: Foo
        }
    ]
});

// //纯客户端
Vue.mixin({
//     //第二种数据预取的方法
//     // beforeMount() {
//     //     const { asyncDate } = this.$options;

//     //     if (asyncDate) {
//     //         this.dataPromise = asyncDate({
//     //             store: this.$store,
//     //             route: this.$route
//     //         });
//     //     }
//     // },
    // beforeRouteUpdate(to, from, next) {
    //     const { asyncDate } = this.$options;
    //     if (asyncDate) {
    //         asyncDate({
    //             store: this.$store,
    //             route: to
    //         }).then(next).catch(next);
    //     } else {
    //         next();
    //     }
    // }
});

router.onReady(() => { //路由器必须要提前解析路由配置中的异步组件，才能正确的调用组件中的可能存在的路由钩子

    //在路由导航之前解析数据（数据全部解析后，传入数据处理视图），可能会出现卡顿，最好加一个数据加载指示器

    //在路由准备就绪之后注册钩子，以便不会二次获取

    // router.beforeResolve((to, from, next) => {
    //     const matched = router.getMatchedComponents(to);
    //     const preMatched = router.getMatchedComponents(from);

    //     let diffed = false;

    //     const activated = matched.filter((component, i) => { //过滤出没有被渲染的组件
    //         return diffed || (diffed = (preMatched[i] !== component));
    //     });

    //     if (!activated.length) {
    //         return next();
    //     }

    //     Promise.all(activated.map(component => {
    //         if (component.asyncDate) {
    //             return component.asyncDate({store, route: to});
    //         }
    //     })).then(() => {
    //         next();
    //     }).catch(next);
    // });
    //匹配要渲染的视图后，再获取数据，响应快速但数据不完整

    app.router = clientRouter;
    app.$mount('#app');
});
