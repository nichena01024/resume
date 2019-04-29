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

import express from 'express'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

server.use(express.static('public'))

server.register(proxy, {
    upstream: backendServerUrl,
    prefix: '/api'
})

server.get('*', (request, reply) => {
    const store = getServerStore(request)
    // @ts-ignore
    Resume.load(store).then(() => {
        // @ts-ignore
        const html = renderResume(store)
        reply.type('text/html; charset=utf-8')
        reply.send(html)
    })
})

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
