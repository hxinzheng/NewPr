import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import createHistory from 'history/createBrowserHistory'
import App from "./container/app"
const history = createHistory()

const render = App =>
    ReactDOM.render(
        <AppContainer>
            <App history={history} />
        </AppContainer>,
        document.getElementById('app')
    )

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./container/app.js', () => {
        const App = require('./container/app').default
        render(App)
    })
}

render(App)