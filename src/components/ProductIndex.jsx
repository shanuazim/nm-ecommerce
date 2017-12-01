import React, { Component } from 'react'
import { Link } from 'react-router'

const Copy = () => {
    return <p>Please click on an item for details!!</p>
  }

class ProductIndex extends Component {
      render() {
        return (
          <div>
            <Copy />
            <div>
              {this.props.route.products && this.props.route.products.map(picture => (
                <Link key={picture.id}
                to={{
                  pathname: `/products/${picture.id}`,
                  state: {
                    modal: true,
                    returnTo: this.props.location.pathname
                  }
                }
                }>
                <img style={{ margin: 10 }} src={picture.src} height="200" alt={picture.title}/>
              </Link>
              ))}
            </div>
          </div>
        )
      }
    }


export default ProductIndex