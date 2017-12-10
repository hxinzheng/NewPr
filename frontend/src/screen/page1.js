import React, {Component} from 'react'

import { Button } from 'react-weui'
import 'weui'
import 'react-weui/build/packages/react-weui.css'

export default class Page1 extends Component{

    state = {
        list : [{name : 'XXX'}, {name : 'ABC'}, {name : 'XYZ'}]
    }

    componentDidMount(){

        setTimeout(() => {
            fetch('/data')
                .then(resp => {
                    return resp.json()
                })
                .then(list => {
                    this.setState({ list })
                })
        }, 2000)

    }

    render(){
        return (
            <div>
                <h1>welcome</h1>
                <ul>
                    {this.state.list.map( (person, i) => {
                        return <li key={i}>{person.name}</li>
                    })}
                </ul>
                <Button>123</Button>
            </div>
        )

    }
} 