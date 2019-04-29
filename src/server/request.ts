import axios, {AxiosInstance} from 'axios'
import {backendServerUrl} from '../config/serverConfig'
import {FastifyInstance, FastifyRequest} from 'fastify'
import {IncomingMessage} from 'http'

export const axiosServer = (req: FastifyRequest<IncomingMessage>) => axios.create({
    baseURL: 'http://localhost:8888',
})

