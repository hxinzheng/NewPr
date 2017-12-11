import React, { Component } from 'react'


import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

import Page1 from 'screen/page1'
import Page2 from 'screen/page2'

export default class App extends Component {

    state = {
        showDevPanel : false 
    }

    componentDidMount(){
        window.addEventListener('shake', this.shakeEventDidOccur, false);
    }

    shakeEventDidOccur = () => {
        this.setState({ showDevPanel: true })
    }

    render() {
        return (
            <Router>
                <Route path='/' >
                    <div>
                        {this.state.showDevPanel &&
                            <DevPanel close={() => {
                                this.setState({ showDevPanel: false })
                            }} />
                        }
                        <Route exact path="/" component={Page1} />
                        <Route path="/abc" component={Page2} />
                    </div>
                </Route>
            </Router>
        )
    }
}


const DevPanel = ({close}) => <div className="dev-panel">
    <div onClick={() => window.location.href=window.location.href}>刷新</div>
    <div onClick={close}>关闭</div>
</div>