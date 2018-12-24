import React, { Component } from "react"
import {Form, FormGroup, FormControl, Button} from "react-bootstrap"

export default class ExpenseForm extends Component {

  constructor() {
    super()
    this.state = {
      date: "",
      description: "",
      amount: ""
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let categoryObject;
    let currentUserObject;

    if (this.props.selectedCategory) {
      categoryObject = {
        id: this.props.selectedCategory.id,
        name: this.props.selectedCategory.name
      }

      currentUserObject = {
        id: this.props.currentUserObject.id,
        first_name: this.props.currentUserObject.first_name,
        last_name: this.props.currentUserObject.last_name
      }
    }

    let jsonObject = {
        date: this.state.date,
        description: this.state.description,
        amount: this.state.amount,
        category: categoryObject,
        user: currentUserObject
    }

    fetch('http://localhost:3001/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObject)
    })

    this.props.addTransaction(jsonObject)

    this.setState({
      date: "",
      description: "",
      amount: ""
    })
  }

  render() {
    return (
      <div>
        <h3>Add an Expense </h3>
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
          <Button onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </div>
    )
  }
}
