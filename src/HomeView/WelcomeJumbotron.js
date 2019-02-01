import React from 'react'
import { connect } from 'react-redux'
import { Jumbotron } from 'react-bootstrap'

const WelcomeJumbotron = props => (
  <Jumbotron className="Jumbotron">
    <h1>Welcome Back {props ? props.user.first_name : null}!</h1>
  </Jumbotron>
)





const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(WelcomeJumbotron)
