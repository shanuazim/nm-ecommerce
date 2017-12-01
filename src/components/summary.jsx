const React = require('react')
const { Link } = require('react-router')

class Summary extends React.Component{
  
render(){
    return(
      <div>  
        <div>
            <p>Your Order has been placed! Thank you!</p>
            <p>The reciept will be messaged shortly. Please check your phone!</p>
        </div>
        <br/>
        <div>
           <Link to="/" className="button btn-cta">Back to Store</Link>
        </div>
      </div>  
    )
}
}
module.exports = Summary