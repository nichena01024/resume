import * as fastify from 'fastify'
import {getResume, updateResume} from '../actions/resumeAction'

export const routes = [
    {
        method: 'GET',
        url: '/resume',
        handler: getResume
    },
    {
        method: 'PUT',
        url: '/resume',
        handler: updateResume
    }
]
