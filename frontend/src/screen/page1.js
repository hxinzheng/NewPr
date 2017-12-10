import React, {Component} from 'react'

import { Button, ButtonArea } from 'react-weui'

import "./a.css"
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
                <h1 className="welcome">welcome</h1>
                <ul>
                    {this.state.list.map( (person, i) => {
                        return <li key={i}>{person.name}</li>
                    })}
                </ul>

                <div className="resp-box"                
                >
                </div>

                <ButtonArea>
                    <Button type='warn'>123</Button>
                </ButtonArea>
            </div>
        )

    }
} 