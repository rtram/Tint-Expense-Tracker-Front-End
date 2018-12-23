import React, { Component } from "react"

export default class UserHome extends Component {

  constructor() {
    super()
    this.state = {
      selectCategory: null
    }
  }

  render() {
    return (
      <div>
        {console.log(this.props.selectedCategory)}
        {console.log(this.props.transactions)}
      </div>
    )
  }
}
