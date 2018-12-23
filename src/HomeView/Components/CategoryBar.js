import React, { Component } from "react"
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class CategoryBar extends Component {

  render() {
    let transactions;
    let categoryTotal;

    if (this.props.category) {
      transactions = this.props.category.transactions
      transactions = transactions.filter(transactionObject => transactionObject.user.id === parseInt(this.props.userId))

      categoryTotal = transactions.map(transaction => transaction.amount)

      let reducer = (accumulator, currentValue) => accumulator + currentValue
      categoryTotal = categoryTotal.reduce(reducer)
      categoryTotal = Math.floor(categoryTotal * 100) / 100
    }

    return (
      <div >
        <Link to={`/users/${this.props.userId}/${this.props.category.id}`}>
          <Button bsStyle="primary">
            <div>
              {this.props.category.name}
            </div>
            <div>
              ${categoryTotal}
            </div>
          </Button>
        </Link>
      </div>
    )
  }
}

// onClick={() => this.props.handleCategoryBarClick(this.props.category.id)}
