import {FastifyReply, FastifyRequest} from 'fastify'
import {IncomingMessage, ServerResponse} from 'http'
import {Resume} from '../models/resumeModel'

export const getResume = async(request: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
    console.log('getResume')
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
        console.log(section, data)
       const update = await Resume.updateResume(section, data)
        return update
    } catch(err) {
        throw err
    }
}
