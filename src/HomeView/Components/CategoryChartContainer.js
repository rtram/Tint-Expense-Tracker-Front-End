import React, { Component } from "react"
import { Button } from "react-bootstrap"
import BarChart from './BarChart.js'
import Doughnut from './DoughnutChart.js'
import '../HomeView.css'

export default class CategoryChartContainer extends Component {

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

  dataObject = () => (
    {
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
  )

  render() {

    return (
      <div class='graph'>
        {this.state.bar ?
          <BarChart
            data={this.dataObject()}
            currentMonth={this.props.currentMonth}
          />
          :
          <Doughnut
            data={this.dataObject()}
            currentMonth={this.props.currentMonth}
          />
        }
        {this.state.bar ?
          <Button
            id="hvr-fade"
            onClick={this.handleToggle}>
              Switch to Pie Display
          </Button>
          :
          <Button
            id="hvr-fade"
            onClick={this.handleToggle}>
              Switch to Bar Display
          </Button>
        }
      </div>
    )
  }
}
