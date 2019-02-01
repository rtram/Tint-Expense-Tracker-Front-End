import React from "react"
import { Doughnut } from 'react-chartjs-2'

const DoughnutChart = props => (
  <Doughnut
    data={props.data}
    width={750}
    height={500}
    options={{
      title: {
        display: true,
        text: `Spending Categories in ${props.currentMonth}`,
        fontsize: 200
      },
      legend: {
        display: true,
        position: "bottom"
      }
    }}
  />
)

export default DoughnutChart
