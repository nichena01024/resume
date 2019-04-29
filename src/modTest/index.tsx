import ReactDOM from 'react-dom'
import {RecordList} from '../components/RecordList'
import * as React from 'react'
import {Resume} from '../containers/Resume'
import {Provider} from 'react-redux'
import {clientStore} from '../store'
import {createStore} from 'redux'
import {resumeReducer} from '../containers/Resume/store/reducer'


const store = createStore(resumeReducer)
const Root = () => (
    <Provider store={store}>
        <Resume />
    </Provider>
)

ReactDOM.render(<Root/>, document.getElementById('app'))
