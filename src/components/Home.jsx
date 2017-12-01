import React, { Component } from 'react'
import Navigation from './common/Navigation'

class Home extends Component {
  render() {
    return (
      <div>
      <Navigation active='home'/>
       <h1>Home</h1><br/>
       <p>Welcome to the Northwestern Mutual Store</p>
       <img style={{ margin: 10 }} src='https://firebasestorage.googleapis.com/v0/b/ecomerse-2ff4a.appspot.com/o/hero3.jpg?alt=media&token=e3116bf9-1b1d-4b10-b95b-95d1be64c5ff' height="100" alt="NM Image"/>
       <img style={{ margin: 10 }} src='https://firebasestorage.googleapis.com/v0/b/ecomerse-2ff4a.appspot.com/o/hero2.jpg?alt=media&token=e854e8f6-cfd4-4d10-9f5d-31f885e3b20c' height="100" alt="NM Image"/>
      </div>
    )
  }
}

export default Home
