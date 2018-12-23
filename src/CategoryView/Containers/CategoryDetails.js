import React, { Component } from "react"

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    this.fetchTransactions()
  }

  render() {
    return (
      <div>
        {this.props.category}
        {this.props.transactions}
      </div>
    )
  }
}
