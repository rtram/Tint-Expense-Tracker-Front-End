import React from "react"
import { Bar } from 'react-chartjs-2'

const BarChart = props => (
  <Bar
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
        display: false,
        position: "bottom"
      }
    }}
  />
)

export default BarChart
