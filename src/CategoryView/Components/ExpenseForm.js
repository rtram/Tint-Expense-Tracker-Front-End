import React, { Component } from "react"
import {Form, FormGroup, FormControl, Button} from "react-bootstrap"

export default class ExpenseForm extends Component {

  constructor() {
    super()
    this.state = {
      date: null,
      description: null,
      amount: null
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <h3>Add an Expense </h3>
        <Form onSubmit={this.handleSubmit}>
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
            {this.props.selectedCategory ? this.props.selectedCategory.name : null}
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
          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}
