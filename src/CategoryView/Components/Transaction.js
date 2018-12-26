import React, { Component } from "react"
import { FormControl, Button} from "react-bootstrap"

export default class Transactions extends Component {

  constructor() {
    super()
    this.state = {
      show: false,
      date: "",
      description: "",
      amount: ""
    }
  }

  componentDidMount() {
    this.setState({
      date: this.props.transactionObject.date,
      description: this.props.transactionObject.description,
      amount: this.props.transactionObject.amount
    })
  }

  handleToggle = () => {
    this.setState({ show: !this.state.show });
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({[name]: value})
  }

  render() {
    return (
      <tr>
        {!this.state.show ?
        <td>{this.props.transactionObject.date}</td> :
        <td>
        <FormControl
          type="date"
          label="Date"
          placeholder="Date"
          name="date"
          value={this.state.date}
          onChange={this.handleChange}
        />
        </td>}

        {!this.state.show ?
        <td>{this.props.transactionObject.description}</td> :
        <td>
        <FormControl
          type="text"
          label="Description"
          placeholder="description"
          name="description"
          value={this.state.description}
          onChange={this.handleChange}
        />
        </td>
        }

        <td>{this.props.transactionObject.category.name}</td>

        {!this.state.show ?
        <td>{this.props.transactionObject.amount}</td> :
        <td>
        <FormControl
          type="number"
          label="Amount"
          placeholder="Amount"
          name="amount"
          value={this.state.amount}
          onChange={this.handleChange}
        />
        </td>
        }

        <td>
          <Button
            ref={button => {
              this.target = button;
            }}
            onClick={this.handleToggle}
          >
            Update
          </Button>
        </td>
      </tr>
    )
  }
}
