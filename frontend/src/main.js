import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from "./container/app"
import 'weui'
import 'react-weui/build/packages/react-weui.css'

import 'stylus/all.styl'

const render = Component => {
    console.log('render')
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('app'),
    )
}

render(App)
if (module.hot) {
    module.hot.accept('./container/app', () => { render(App) })
}