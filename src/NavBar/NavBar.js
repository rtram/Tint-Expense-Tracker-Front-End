import React, { Component } from "react"
import './NavBar.css';
import {Button} from "react-bootstrap"
import {Link} from 'react-router-dom'
import {Navbar, Nav} from "react-bootstrap"

export default class Footer extends Component {

  render() {

    return (
      <div>
      <Navbar className="navbar">
        <Nav>
          <Link to={`/`}>
            <Button bsStyle="primary" block>
              Change User
            </Button>
          </Link>
        </Nav>
      </Navbar>
      </div>
    )
  }
}
