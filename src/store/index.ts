import {combineReducers, createStore} from 'redux'
import {resumeReducer} from '../containers/Resume/store/reducer'

const rootReducer = combineReducers({
    resume: resumeReducer
})

export type AppState = ReturnType<typeof rootReducer>

export default function configureStore() {
    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );
}
