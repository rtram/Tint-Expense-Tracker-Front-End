import React, { Component } from "react"

export default class Transactions extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <tr>
        <td>{this.props.transaction.date}</td>
        <td>{this.props.transaction.description}</td>
        <td>{this.props.transaction.category.name}</td>
        <td>{this.props.transaction.amount}</td>
      </tr>
    )
  }
}
