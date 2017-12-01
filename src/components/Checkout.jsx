import React, { Component } from 'react'
import { Link, hashHistory, withRouter } from 'react-router'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.cartDatabase = this.props.route.app.database().ref().child('cart').child('cartItems')
    this.state = ({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      billingAddress: '',
      cardNumber: '',
      count: 0,
      price: 0,
      cartItems: [],
      errors: {
        firstName: false,
        lastName: false,
        phoneNumber: false,
        billingAddress: false,
        cardNumber: false,
      }
    })
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

  handleUserPhoneInput = (event) => {
    this.setState({
      phoneNumber: event.target.value
    })
  }

  handleUserFirstNameInput = (event) => {
    this.setState({
      firstName: event.target.value
    })
  }

  handleUserLastNameInput = (event) => {
    this.setState({
      lastName: event.target.value
    })
  }

  handleUserBillingAddressInput = (event) => {
    this.setState({
      billingAddress: event.target.value
    })
  }

  handleUserCardNumberInput = (event) => {
    this.setState({
      cardNumber: event.target.value
    })
  }

  validate = () => {
    this.setState({
      errors: {
        billingAddress: !(this.state.billingAddress.length > 3),
        cardNumber: false,
        firstName: !(this.state.firstName.length > 3),
        lastName: !(this.state.lastName.length > 3),
        phoneNumber: !(this.state.phoneNumber.length === 10)
      }
    }, this.handleSubmit)
  }

  handleSubmit = (event) => {
    {
      //make sure all error values are false
      if (Object.keys(this.state.errors).every(k => !this.state.errors[k])) {
        let count = 0
        let price = 0
        this.state.cartItems.map((item) => {
          price += this.props.route.products[item.key].price * item.val
        })
        this.props.route.placeOrder(price, this.state.phoneNumber, () => {
          this.props.router.push('/confirm')
        })
      } else {
        console.log('form is not valid...NOT submitting')
      }
    }
  }

  renderTable = () => {
    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Item</th>
              <th>Cost</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {this.state.cartItems.map((item) => {
              return (
                <tr key={item.key}>
                  <td>{this.props.route.products[item.key].title}</td>
                  <td>${this.props.route.products[item.key].price}</td>
                  <td>{item.val}</td>
                </tr>)
            })
            }
          </tbody>
        </table></div>)
  }

  renderForm = () => {
    const errors = this.state.errors
    return (<form >
      <h2>Personal Information:</h2>
      <div className="row">
        <div className="large-4 columns md-text-field with-floating-label">
          <input onChange={this.handleUserFirstNameInput} className={errors.firstName ? 'has-error' : ''} type="text" id="firstName" required></input>
          <label htmlFor="firstName">First Name:</label>
          {errors.firstName ? <span className="error">Invalid entry</span> : ''}
        </div>
        <div className="large-4 columns md-text-field with-floating-label">
          <input onChange={this.handleUserLastNameInput} className={errors.lastName ? 'has-error' : ''} type="text" id="lastName" required></input>
          <label htmlFor="lastName">Last Name:</label>
          {errors.lastName ? <span className="error">Invalid entry</span> : ''}
        </div>
        <div className="large-4 columns md-text-field with-floating-label">
          <input type="number"
            className={errors.phoneNumber ? 'has-error' : ''}
            id="phoneNumber"
            ref="phoneNumber"
            required
            value={this.state.phoneNumber}
            onChange={this.handleUserPhoneInput} />
          <label htmlFor="phoneNumber">Phone Number</label>
          {errors.phoneNumber ? <span className="error">Invalid entry</span> : ''}
        </div>
      </div>
      <div className="row">
        <div className="large-12 columns md-text-field with-floating-label">
          <input className={errors.billingAddress ? 'has-error' : ''} 
              type="text" id="billingAddress" 
              onChange={this.handleUserBillingAddressInput} required></input>
          <label htmlFor="billingAddress">Billing Address</label>
            {errors.billingAddress ? <span className="error">Invalid entry</span> : ''}  
        </div>
      </div>
      <div className="row">
      <div className="large-6 columns md-multi-ctrl-field">
      <label htmlFor="creditCardType">Credit card Type</label>
      <input id="amex" type="radio" value="amex"></input>
      <label htmlFor="amex">American Express</label>
      <input id="visa" type="radio" value="visa"></input>
      <label htmlFor="visa">Visa</label>
      <input id="mc" type="radio" value="mc"></input>
      <label htmlFor="visa">MasterCard</label>
 </div>
 <div className="large-12 columns md-text-field with-floating-label">
    <input type="text" id="cc" required></input>
    <label htmlFor="cc">Credit Card Number:</label>
        </div>
      </div>
      <input className="button btn-cta" onClick={this.validate} type="button" value="Confirm"></input>
      <Link to="/cart" className="margin-small button btn-cta dull" type="button">Cancel</Link>
    </form>)
  }

  render() {
    let count = 0
    let price = 0
    return (
      <div>
        <h1>Invoice</h1>
        {this.renderTable()}
        {this.state.cartItems.map((item) => {
          count += item.val
          price += this.props.route.products[item.key].price * item.val
        })}
        <p>Total: {count}</p>
        <p>Total Price: ${price}</p>
        <br />
        {this.renderForm()}
      </div>
    )
  }
}

Checkout.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(Checkout)