import {FastifyReply, FastifyRequest} from 'fastify'
import {IncomingMessage, ServerResponse} from 'http'
import {Resume} from '../models/resumeModel'

export const getResume = async(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
        return await Resume.findOne({})
    } catch(err) {
        throw err
    }
}

export const updateResume = async(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    try {
        const section = request.body.section,
            data = request.body.data
        return await Resume.updateResume(section, data)
    } catch(err) {
        throw err
    }
}
