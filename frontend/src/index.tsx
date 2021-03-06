import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

import Main from './main'
import * as serviceWorker from './serviceWorker'
import configureStore from './configureStore'

const history = createBrowserHistory()

const initialState = window.INITIAL_REDUX_STATE
const store = configureStore(history, initialState)

ReactDOM.render(<Main store={store} history={history} />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
