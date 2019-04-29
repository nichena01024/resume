// demo代码
import fastify from 'fastify'
import {IncomingMessage, Server, ServerResponse} from 'http'
import {backendServerUrl} from '../config/serverConfig'
import {getServerStore} from '../store'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import * as React from 'react'
import {Resume} from '../containers/Resume'
import {render} from 'react-dom'
import {createStore} from 'redux'
import {resumeReducer} from '../containers/Resume/store/reducer'
const proxy = require('fastify-http-proxy')
// express-http-proxy 不支持esModule导入
//const proxy = require('express-http-proxy')

import express from 'express'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
// 数据api

server.use(express.static('public'))

// server.use('/api', proxy(backendServerUrl, {
//     proxyReqPathResolver: (req: IncomingMessage) => {
//         console.log(req.url)
//         return req.url
//     }
// }))
server.register(proxy, {
    upstream: backendServerUrl,
    prefix: '/api'
})

server.get('*', (request, reply) => {
    // const store = getServerStore(request)
    const store = getServerStore(request)
    // @ts-ignore
    Resume.load(store).then(() => {
        // @ts-ignore
        const html = renderResume(store)
        reply.type('text/html; charset=utf-8')
        reply.send(html)
    })

    // 获取store
    // 获取所有match这个路由的组件
    // 在每个路由下面有一个loadData属性，对应每个container中也有一个loadData，负责像Redux dispatch，获取数据
    // 当所有异步数据完成后
    // 渲染为html返回

})
// render方法，通过request，store，routes得出结果
// const render = (store: Store)

server.listen(8888, console.log)

const renderResume = (store: ReturnType<typeof getServerStore>) => {
    const content = renderToString((
        <Provider store={store}>
            <Resume/>
        </Provider>
    ))

    return `
        <html>
            <link href="style.css" rel="stylesheet" type="text/css"/>
            <body>
                <div id="app">${content}</div>
                <script>
                    // 通过全局变量做到client和模板沟通
                    window.context = {
                        state: ${JSON.stringify(store.getState())}
                    }
                </script>
                <script src="/index.js"></script>
            </body>
        </html>
    `
}
