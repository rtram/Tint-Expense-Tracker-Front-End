import React, { Component } from "react"
import {Button, Grid, Row, Col} from "react-bootstrap"
import {Bar, Doughnut} from 'react-chartjs-2'

export default class CategoryBarChart extends Component {

  constructor() {
    super()
    this.state={
      bar: true
    }
  }

  handleToggle = () => {
    this.setState({
      bar: !this.state.bar
    })
  }

  render() {

    let dataObject = {
      data: {
          labels: this.props.categoryLabels,
          datasets: [{
              label: 'Money Spent',
              data: this.props.categoryTotals,
              backgroundColor: [
                  'rgba(230, 25, 75, .4)',
                  'rgba(245, 130, 48, .4)',
                  'rgba(255, 225, 25, .4)',
                  'rgba(210, 245, 60, .4)',
                  'rgba(60, 180, 75, .4)',
                  'rgba(70, 240, 240, .4)',
                  'rgba(0, 130, 200, .4)',
                  'rgba(145, 30, 180, .4)',
                  'rgba(240, 50, 230, .4)',
                  'rgba(128, 128, 128, .4)'
              ],
              borderColor: [
                  'red',
                  'orange',
                  'yellow',
                  'lime',
                  'green',
                  'cyan',
                  'blue',
                  'purple',
                  'magenta',
                  'grey'
              ],
              borderWidth: 1
          }]
      }
    }

    return (
      <Grid>
        <Row>
          <Col md={2}>
          </Col>
          <Col md={8}>
            <div>
              {this.state.bar ?
                <Bar
                  data={dataObject.data}
                  width={750}
                  height={500}
                  options={{
                    title: {
                      display: true,
                      text: `Spending Categories in ${this.props.currentMonth}`,
                      fontsize: 200
                    },
                    legend: {
                      display: false,
                      position: "bottom"
                    }
                  }}
                />
                :
                <Doughnut
                  data={dataObject.data}
                  width={750}
                  height={500}
                  options={{
                    title: {
                      display: true,
                      text: `Spending Categories in ${this.props.currentMonth}`,
                      fontsize: 200
                    },
                    legend: {
                      display: true,
                      position: "bottom"
                    }
                  }}
                />
              }
              {this.state.bar ?
                <Button onClick={this.handleToggle}>Switch to Pie Display</Button>
                :
                <Button onClick={this.handleToggle}>Switch to Bar Display</Button>
              }
            </div>
          </Col>
          <Col md={2}>
          </Col>
        </Row>
      </Grid>
    )
  }
}
