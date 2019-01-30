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

  handleSubmit = (event) => {
    event.preventDefault()

    let categoryObject;
    let userObject;

    if (this.props.selectedCategory) {
      categoryObject = {
        id: this.props.selectedCategory.id,
        name: this.props.selectedCategory.name
      }

      userObject = {
        id: this.props.userObject.id,
        first_name: this.props.userObject.first_name,
        last_name: this.props.userObject.last_name
      }
    }

    let jsonObject = {
        date: this.state.date,
        description: this.state.description,
        amount: parseFloat(this.state.amount),
        category: categoryObject,
        user: userObject
    }

    this.props.postingTransaction(jsonObject)

    this.props.addTransaction(jsonObject)
  }

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
                <Button id="hvr-fade" onClick={this.handleSubmit}><strong>Submit</strong></Button>
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


export default connect(null, { postingTransaction })(ExpenseForm)
