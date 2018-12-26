import React, { Component } from "react"
import {Button} from "react-bootstrap"

export default class Transactions extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  handleUpdate = () => {
    console.log("dateClick")
  }

  render() {
    return (
      <tr onDoubleClick={this.handleUpdate}>
        <td>{this.props.transaction.date}</td>
        <td>{this.props.transaction.description}</td>
        <td>{this.props.transaction.category.name}</td>
        <td>{this.props.transaction.amount}</td>
      </tr>
    )
  }
}
