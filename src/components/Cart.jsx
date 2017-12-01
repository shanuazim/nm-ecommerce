import React, { Component } from 'react'
import Navigation from './common/Navigation'
import { Link } from 'react-router'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.cartDatabase = this.props.route.app.database().ref().child('cart').child('cartItems')
    this.state = {
      cartItems: []
    }
  }
  componentDidMount() {
    //get cart data here
    // DataSnapshot
    let prevCart = this.state.cartItems
    this.cartDatabase.on('child_added', snap => {
      prevCart.push({
        key: snap.key,
        val: snap.val()
      })
      this.setState({
        cartItems: prevCart
      })
    })
  }

  render() {
    let cartItems = this.state.cartItems
    return <div>
      <Navigation active='cart' />
      {(Object.keys(cartItems).length === 0) ? <h2>Your cart is empty</h2> :
        <div>
          <ul>
           { this.state.cartItems.map((item) => {
             return <li key={item.key}>{this.props.route.products[item.key].title} - {item.val}</li>
           })
           }
          </ul>
          <Link to="/checkout" className="button btn-cta">Checkout</Link>
        </div>
      }
    </div>
  }
}

export default Cart