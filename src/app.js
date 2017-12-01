import React, { Component } from 'react'
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Product from './components/Product'
import Accessories from './components/Accessories'
import Home from './components/Home'
import ProductIndex from './components/ProductIndex'
import Summary from './components/summary'
import Technology from './components/technology'
import { TWILIO_CONFIG, DB_CONFIG } from './config/config'
import firebase, { database } from '../node_modules/firebase/app'
import '../node_modules/firebase/database'
import axios from 'axios'
import qs from 'qs'

//config variables
//alreday over $10 from when we forgot hot have onClick in a function...
//also my carrier/number is currently blocking messages
const SMS_ENABLED = true

class App extends Component {
    constructor(props) {
        super(props)
        this.app = firebase.initializeApp(DB_CONFIG)
        this.database = this.app.database().ref().child('accessories')
        this.cartDatabase = this.app.database().ref().child('cart')
        this.cartItemsDatabase = this.app.database().ref().child('cart').child('cartItems')
        this.state = {
            cartItems: [],
            products: [],
        }
    }

    componentWillMount() {
        const prevProducts = this.state.products
        //console.log(this.database)
        this.database.on('child_added', snap => {
            prevProducts.push({
                key: snap.key,
                src: snap.val().src,
                title: snap.val().title,
                price: snap.val().price,
                id: prevProducts.length
            })

            this.setState({
                products: prevProducts
            })
        })

        let prevCart = this.state.cartItems
        this.cartItemsDatabase.on('child_added', snap => {
          prevCart.push({
            key: snap.key,
            val: snap.val()
          })
          this.setState({
            cartItems: prevCart
          })
        })
      }

    addToCart = (id) => {
        let val = 0
        if(this.state.cartItems && this.state.cartItems.find((element) => element.key === id)) { 
            //add to existing value
            let prevItem = this.state.cartItems.find((element) => element.key === id)
            val = prevItem.val + 1
        } else { //lets initialize
            val = 1
        }
        this.cartItemsDatabase.child(id).set(val)
    }

    clearCart = (cb) => {
        this.cartDatabase.child('cartItems').remove()
        this.setState({
            cartItems: []
        }, cb)
    }

    placeOrder = (invoiceTotal, phoneNumber, cb) => {
        this.clearCart(cb)
        this.forceUpdate
        let totalDollars = Number(invoiceTotal).toFixed(2)
        const body = `Confirmation: We have received your payment of $${totalDollars}. Thank you for your order!`
        this.sendConvirmationSMS(phoneNumber, body)
    }

    sendConvirmationSMS = (phoneNumber, body) => {
        if(SMS_ENABLED){
            axios({
                method: 'post',
                url: TWILIO_CONFIG.session_url,
                auth:
                    {
                        username: TWILIO_CONFIG.username,
                        password: TWILIO_CONFIG.password
                    },
                data: qs.stringify({
                    "To": phoneNumber,
                    "From": TWILIO_CONFIG.from,
                    "Body": body,
                })
            }).then(function (response) { console.log(response)})
            //TO DO - do something if SMS fails, catch error
        } else {
            console.log('Sending message to ' + phoneNumber)
            console.log(body)
        }
    }

    render() {
        const { products, cartItems } = this.state
        return (
            <Router history={hashHistory}>
                <Route exact path="/" component={Home}>
                    <IndexRoute component={Home} />
                </Route>
                <Route path="/technology" component={Technology} />
                <Route path="/accessories" component={Accessories}>
                    <IndexRoute component={ProductIndex} products={products} />
                    <Route path="/products/:id" component={Product} addToCart={this.addToCart} products={products} />
                </Route>
                <Route path="/cart" component={Cart} cartItems={cartItems} products={products} app={this.app} />
                <Route path="/checkout" component={Checkout} app={this.app} 
                    products={products} placeOrder={this.placeOrder} />
                <Route path="/confirm" component={Summary} />
                <Route path="*" component={Home} />
            </Router>
        )
    }

}
export default App