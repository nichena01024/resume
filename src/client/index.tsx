import {createStore} from 'redux'
import {resumeReducer} from '../containers/Resume/store/reducer'
import {Provider} from 'react-redux'
import * as React from 'react'
import {Resume} from '../containers/Resume'
import ReactDOM from 'react-dom'
import {clientStore} from '../store'

// const store = createStore(resumeReducer)
const store = clientStore()
const App = () => {
    return (
        <Provider store={store}>
            <Resume/>
        </Provider>
    )
}

ReactDOM.hydrate(<App />, document.getElementById('app'))
