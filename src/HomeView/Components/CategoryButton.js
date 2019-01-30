import React, { Component } from "react"
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class CategoryButton extends Component {

  render() {

    return (
      <div >
        <Link to={`/users/${this.props.userObject.id}/${this.props.categoryId}`}>
          <Button bsStyle="primary" block>
            <div>
              <h3>{this.props.categoryName}</h3>
            </div>
            <div>
              ${Number.isInteger(this.props.categoryTotal) ? this.props.categoryTotal + ".00" : this.props.categoryTotal}
            </div>
          </Button>
        </Link>
      </div>
    )
  }
}
