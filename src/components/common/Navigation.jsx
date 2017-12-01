import React, { Component } from 'react'
import { Link } from 'react-router'

class Navigation extends Component {

    render() {
        return (
            <div>
            <ul className="tabs">
                <li className={this.props.active === 'home' ? 'tab-title active' : 'tab-title'}>
                    <Link to="/" className="btn btn-info" activeClassName="active">Home</Link></li>
                <li className={this.props.active === 'accessories' ? 'tab-title active' : 'tab-title'}>
                    <Link to="/accessories" className="btn btn-info" activeClassName="active">Accessories</Link></li>
                <li className={this.props.active === 'technology' ? 'tab-title active' : 'tab-title'}>
                    <Link to="/technology" className="btn btn-info" activeClassName="active">Technology</Link></li>                     
                <li className={this.props.active === 'cart' ? 'tab-title active' : 'tab-title'}>
                    <Link to="/cart" className="btn btn-info" activeClassName="active">Cart</Link></li>
                  
                    
            </ul>
            <br />
            </div>
        )
    }
}
export default Navigation