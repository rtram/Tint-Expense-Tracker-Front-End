import React, { Component } from "react"

export default class Transactions extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {this.props.transaction.amount}
      </div>
    )
  }
}
