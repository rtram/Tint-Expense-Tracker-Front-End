import React, { Component } from "react"
import CategoryBar from "../Components/CategoryBar"

export default class CategoryContainer extends Component {

  render() {
    return (
      <div>
        {this.props.transactions ? this.props.transactions.map(category =>
         <CategoryBar
          key={category.id}
          userId={this.props.userId}
          category={category}
        />) : null
        }
      </div>
    )
  }
}
