'use strict';

import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import {sync} from 'vuex-router-sync';
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
import Baz from './components/Baz.vue';

Vue.use(Router);
Vue.use(Vuex);

import App from './App.vue';

export function createApp() {
    const router = createRouter();
    const store = createStore();

    sync(store, router);//同步路由状态到store

    const app = new Vue({
        router,
        store,
        render: h => h(App)//渲染模板
    });

    return { app, router, store };
}

export function createRouter() {
    return new Router({
        mode: 'history', //没有hash
        routes: [
            {
                path: '/',
                name: 'Foo',
                component: Foo
            }, //代码分割，惰性加载，减少在初始渲染中下载的资源体积，异步组件和webpack2支持的动态导入作为代码分割点结合
            {
                path: '/Bar',
                name: 'Bar',
                component: Bar
            },
            // {
            //     path: '/Baz',
            //     name: 'Baz',
            //     component: Baz
            // }
        ]
    });
}

//服务器渲染的是应用程序的‘快照’，如果应用程序依赖异步数据，在开始渲染之前，需要先预取和解析这些数据
//客户端在挂载程序之前，需要获取与服务器端应用程序完全相同的数据（否则，就会混合失败）
//所以，获取的数据需要位于视图组件之外，放置在专门的数据预取存储容器中

//在服务器端，在渲染之前预取数据，并将数据填充到store中，然后在HTML中序列化和内联预置状态，
//这样，在挂载到客户端应用程序之前，可以直接从store获取到内联预置状态
export function createStore() {

    return new Vuex.Store({
        state: {
            count: 0
          },
          mutations: {
            increment (state) {
              state.count++
            }
          },
          actions: {
            increment ({commit}) {
                new Promise(() => {
                    commit('increment');
                });
            }
          }
    });
}

//store代码拆分和惰性注册