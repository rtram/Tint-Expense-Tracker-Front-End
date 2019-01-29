import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'

class WelcomeJumbotron extends Component {

  render() {
    return(
      <Jumbotron className="Jumbotron">
        <h1>Welcome Back {this.props ? this.props.user.first_name : null}!</h1>
      </Jumbotron>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(WelcomeJumbotron)
