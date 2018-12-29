import React, { Component } from "react"
import {Bar} from 'react-chartjs-2'

export default class CategoryContainerChart extends Component {

  render() {

    let dataObject = {
      data: {
          labels: this.props.categoryLabels,
          datasets: [{
              label: 'Money Spent',
              data: this.props.categoryTotals,
              backgroundColor: [
                  'rgba(230, 25, 75, .2)',
                  'rgba(245, 130, 48, .2)',
                  'rgba(255, 225, 25, .2)',
                  'rgba(210, 245, 60, .2)',
                  'rgba(60, 180, 75, .2)',
                  'rgba(70, 240, 240, .2)',
                  'rgba(0, 130, 200, .2)',
                  'rgba(145, 30, 180, .2)',
                  'rgba(240, 50, 230, .2)',
                  'rgba(128, 128, 128, .2)'
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
      <div className="chart">
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
      </div>
    )
  }
}
