import React, { Component } from "react"
import CategoryBar from "../Components/CategoryBar"

export default class CategoryContainer extends Component {

  render() {
    return (
      <div>
        {this.props.categories.map(category =>
          <CategoryBar
          key={category}
          category={category}
          transactions={this.props.transactions}
          setCategory={this.props.setCategory}
          />
        )}
      </div>
    )
  }
}
