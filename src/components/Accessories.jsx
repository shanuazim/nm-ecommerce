import React, { Component } from 'react'
import Navigation from './common/Navigation'
import Modal from './Modal'

class Accessories extends Component {
  componentWillReceiveProps(nextProps) {
    this.isModal = (nextProps.location.state &&
      nextProps.location.state.modal)
    if (this.isModal &&
      nextProps.location.key !== this.props.location.key) {
      this.previousChildren = this.props.children
    }
  }

  render() {
    return (
      <div>
        <Navigation active='accessories' />
          {(this.isModal) ? this.previousChildren : this.props.children}
          {(this.isModal) ?
            <Modal isOpen={'show'} 
            returnTo={this.props.location.state.returnTo}>
              {this.props.children}
            </Modal>
            : ''
          }
      </div>
    )
  }
}

export default Accessories
