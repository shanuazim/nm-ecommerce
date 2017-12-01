import React, { Component } from 'react'
import { Link } from 'react-router'

class Modal extends Component {

render() {
  return (
      <div>
        <div className="reveal-overlay show">
        <div className="reveal show" id="productModal">
            <div className="reveal-header">
            <h4>{this.props.children.props.route.products[this.props.children.props.params.id].title}</h4>
            </div>
            <div className="reveal-content">
            {this.props.children}
            </div>
            <button className="reveal-close" data-close="">
            <Link to={this.props.returnTo}><span style={{color: "white"}} className="icon icon-close"></span></Link>
            </button>
        </div>
    </div>
      </div>
    )
  }
}

export default Modal