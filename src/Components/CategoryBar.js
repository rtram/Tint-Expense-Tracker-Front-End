import React, { Component } from "react"

export default class CategoryBar extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div>
        {this.props.category}
      </div>
    )
  }
}
