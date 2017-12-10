import React, { Component } from 'react'


import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Page1 from 'screen/page1'
import Page2 from 'screen/page2'

export default class App extends Component {

    render() {
        return (
            <Router>
                <Route path='/' >
                    <div>
                        <Route exact path="/" component={Page1} />
                        <Route path="/abc" component={Page2} />
                    </div>
                </Route>
            </Router>
        )
    }
}

