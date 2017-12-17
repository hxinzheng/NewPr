import React, {Component} from 'react'

import { Button, ButtonArea } from 'react-weui'

export default class Home extends Component{

    state = {
        list : [{name : 'XXX'}, {name : 'ABC'}, {name : 'XYZ'}]
    }

    componentDidMount(){

        setTimeout(() => {
            // fetch('/data')
            //     .then(resp => {
            //         return resp.json()
            //     })
            //     .then(list => {
            //         this.setState({ list })
            //     })
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

                <div className="text-block">作者：黄新政4</div>
                <div className="text-block">
                “客亦知夫水与月乎？逝者如斯，而未尝往也；盈虚者如彼，而卒莫消长也。盖将自其变者而观之，则天地曾不能以一瞬；自其不变者而观之，则物与我皆无尽也，而又何羡乎！且夫天地之间，物各有主，苟非吾之所有，虽一毫而莫取。惟江上之清风，与山间之明月，耳得之而为声，目遇之而成色，取之无禁，用之不竭，是造物者之无尽藏也，而吾与子之所共适。”
                </div>
                <div className="text-block">
                客喜而笑，洗盏更酌。肴核既尽，杯盘狼藉。相与枕藉乎舟中，不知东方之既白。
                </div>

                <ButtonArea>
                    <Button onClick={() => location.reload()} type='warn'>取消</Button>
                </ButtonArea>
            </div>
        )

    }
} 