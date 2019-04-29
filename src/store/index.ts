import {applyMiddleware, combineReducers, createStore} from 'redux'
import {resumeReducer} from '../containers/Resume/store/reducer'
import * as fastify from 'fastify'
import thunk from 'redux-thunk'
import {axiosServer} from '../server/request'
import {IncomingMessage} from 'http'
import {axiosClient} from '../client/request'

const rootReducer = combineReducers({
    resume: resumeReducer
})

export type AppState = ReturnType<typeof rootReducer>

// 两个store，分别对应服务端和客户端
export function clientStore() {
    // @ts-ignore
    const defaultState = window.context.state
    return createStore(
        resumeReducer,
        defaultState,
        applyMiddleware(thunk.withExtraArgument(axiosClient()))
    );
}

export function getServerStore(req: fastify.FastifyRequest<IncomingMessage>) {
    return createStore(
        resumeReducer,
        applyMiddleware(thunk.withExtraArgument(axiosServer(req)))
    )
}
