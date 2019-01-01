import React, { Component } from "react"
import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'

export default class Footer extends Component {

  render() {

    return (
      <div>
        Sign In
        <br/>
        <br/>
        <Link to={`/users/1/`}>
          <Button bsStyle="primary" block><strong>Robin Tram</strong></Button>
        </Link>

        <Link to={`/users/2/`}>
          <Button bsStyle="primary" block><strong>Kevin Tram</strong></Button>
        </Link>

        <Link to={`/users/3/`}>
          <Button bsStyle="primary" block><strong>Sarah Tram</strong></Button>
        </Link>

        <br/>
        <br/>
        <br/>
      </div>
    )
  }
}
