import React, { Component } from "react"
import '../Containers/CategoryDetails.css';
import { connect } from 'react-redux'
import { postingTransaction } from '../../redux/actions/transactions.js'
import {Form, FormGroup, FormControl, Button, Grid, Row, Col} from "react-bootstrap"

class ExpenseForm extends Component {

  constructor() {
    super()
    this.state = {
      date: "",
      description: "",
      amount: ""
    }
  }

  resetState = () => {
    this.setState({
      date: "",
      description: "",
      amount: ""
    })
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  categoryObject = () => {
    let categoryObject = {
      id: this.props.categoryId,
      name: this.categoryName()
    }
    return categoryObject
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let transactionObject = {
        date: this.state.date,
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        category: this.categoryObject(),
        user: this.props.user
    }

    this.props.postingTransaction(transactionObject)
    this.resetState()
  }

  categoryName = () => this.props.categoryNames[this.props.categoryId - 1]

  render() {
    return (
      <div>
        <h3>Add an Expense </h3>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={4}>
              <Form>
                <FormGroup>
                  <FormControl
                    type="date"
                    label="Date"
                    placeholder="Date"
                    name="date"
                    value={this.state.date}
                    onChange={this.handleChange}
                  />
                  <FormControl
                    label="Description"
                    placeholder="Transaction Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                  />
                  {this.props.categoryId ? this.categoryName(): null}
                  <FormControl
                    type="number"
                    min="0.01"
                    step="0.01"
                    label="Amount"
                    placeholder="Amount"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button id="hvr-fade" onClick={this.handleSubmit}>
                  <strong>Submit</strong>
                </Button>
              </Form>
            </Col>
            <Col md={6}></Col>
          </Row>
        </Grid>

        <br/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    categoryNames: state.categoryNames
  }
}

export default connect(mapStateToProps, { postingTransaction })(ExpenseForm)
