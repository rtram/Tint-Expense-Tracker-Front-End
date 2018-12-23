import React, { Component } from "react"

export default class Transactions extends Component {

  render() {
    return (
      <div>
        {this.props.transaction.description}
      </div>
    )
  }
}
