import {IncomingMessage, Server, ServerResponse} from 'http'

import * as mongoose from 'mongoose'
import * as fastify from 'fastify'

import { Resume } from './api/models/resumeModel'
import {routes} from './api/routes/resumeRoutes'

// @ts-ignore
const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

routes.forEach((route, index) => {
    // @ts-ignore
    server.route(route)
})

mongoose.connect('mongodb://localhost:27017/resumeDB', {useNewUrlParser: true})

server.listen('7654', () => {console.log('listening')})

