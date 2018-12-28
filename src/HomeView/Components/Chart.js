import React, { Component } from "react"
import {Bar} from 'react-chartjs-2'

export default class Chart extends Component {
  constructor() {
    super()
    this.state = {

    }
  }




  render() {

    let dataObject = {
        type: 'bar',
        data: {
            labels: this.props.label,
            datasets: [{
                label: 'Money Spent',
                data: this.props.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',

                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    }

    return (
      <div className="chart">
        <Bar
          data={dataObject.data}
          width={500}
          height={500}
          options={{
            title: {
              display: true,
              text: "Last Three Months's Spending",
              fontsize: 100
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    )
  }
}
