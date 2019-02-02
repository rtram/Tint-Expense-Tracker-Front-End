import React from "react"
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const CategoryButton = props => (
  <>
    <Link to={`/users/${props.userObject.id}/${props.categoryId}`}>
      <Button bsStyle="primary" block>
        <div>
          <h3>{props.categoryName}</h3>
        </div>
        <div>
          ${Number.isInteger(props.categoryTotal) ? props.categoryTotal + ".00" : props.categoryTotal}
        </div>
      </Button>
    </Link>
  </>
)

export default CategoryButton
