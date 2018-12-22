import React, { Component } from "react"
import CategoryBar from "../Components/CategoryBar"

export default class CategoryContainer extends Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div>
        {this.props.categories.map(category => <CategoryBar category={category} />)}
      </div>
    )
  }
}
