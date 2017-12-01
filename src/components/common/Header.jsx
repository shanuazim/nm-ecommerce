import React, { Component } from 'react'
import logo from './logo.svg'

const headerStyle = {
    "borderBottom": "1px solid #ffb81c",
    "display": "flex",
    "marginBottom": "2rem"
}
const logoStyle = {
    "height": "32px"
}
const titleStyle = {
    "borderLeft": "1px solid #cccccc"
}


class Header extends Component {

    render() {
        return (
            <a href="*" style={{textDecoration:"none"}}>
                <div style={headerStyle} className="padding-large bg-white">
                    <img src={logo} style={logoStyle} className="padding-right-medium" alt="Northwestern Mutual Logo" />
                    <h1 style={titleStyle} className="padding-left-medium margin-none">{this.props.title}</h1>
                </div>
            </a>
        )
    }
}
export default Header