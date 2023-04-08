import React from "react";
import { Avatar, color } from '@chakra-ui/react'

class Logo extends React.Component {
    constructor(props){
        super(props)
        console.log(props.style)
    }

    render() {
        return (
            <div style={{
                display: 'inline-block',
                verticalAlign: 'middle',
            }}>
                <Avatar
                    name='ZhangChi'
                    src='/images/avator.jpeg'
                    style={{
                        verticalAlign: 'middle'
                    }}
                />
                <span style={{
                    verticalAlign: 'middle',
                    marginLeft: '10px',
                    fontSize: '20px',
                    fontFamily: 'Georgia, Simsun, serif',
                    color: this.props.style.color
                }}>
                    ZhangChi's Blog
                </span>
            </div>
        )
    }
}

export { Logo as default }