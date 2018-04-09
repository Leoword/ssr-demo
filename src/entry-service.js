'use strict';

import { createApp } from './app';

export default context => {

    //因为可能是异步路由或者钩子函数组件，返回Promise对象，以便渲染
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();

        router.push(context.url); //设置服务器端router的位置

        router.onReady(() => { //等到router将可能的异步组件和钩子函数解析完
            const matchComponents = router.getMatchedComponents();
            
            if (!matchComponents.length) { //匹配不到路由
                return reject({ code: 404});
            }

            Promise.all(matchComponents.map(Component => { //获得匹配组件，如果组件暴露asyncData就调用它
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                //在所有预取钩子resolve之后，store已经填充入渲染应用程序所需的状态，把状态附加到上下文，‘template’选项用于render时，
                //状态将自动序列化为'window.__INITIAL_STATE__',并注入HTML

                context.state = store.state;
                resolve(app);
            }).catch(reject);

        }, reject);
    });
}