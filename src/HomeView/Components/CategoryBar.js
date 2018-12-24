import React, { Component } from "react"
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class CategoryBar extends Component {

  render() {

    return (
      <div >
        <Link to={`/users/${this.props.userObject.id}/${this.props.categoryId}`}>
          <Button bsStyle="primary">
            <div>
              {this.props.categoryName}
            </div>
            <div>
              ${this.props.categoryTotal}
            </div>
          </Button>
        </Link>
      </div>
    )
  }
}
