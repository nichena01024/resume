// demo代码
import fastify from 'fastify'
import {IncomingMessage, Server, ServerResponse} from 'http'
import {backendServerUrl} from '../config/serverConfig'
// express-http-proxy 不支持esModule导入
const proxy = require('express-http-proxy')

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})
// 数据api

server.use('/api', proxy(backendServerUrl, {
    proxyReqPathResolver: (req: IncomingMessage) => {
        console.log(req.url)
        return '/ba/api' + req.url
    }
}))

server.get('*', (request, reply) => {
    // 获取store
    // 获取所有match这个路由的组件
    // 在每个路由下面有一个loadData属性，对应每个container中也有一个loadData，负责像Redux dispatch，获取数据
    // 当所有异步数据完成后
    // 渲染为html返回

})
// render方法，通过request，store，routes得出结果
// const render = (store: Store)

server.listen(8888, err => {
    console.error(err.message)
})
