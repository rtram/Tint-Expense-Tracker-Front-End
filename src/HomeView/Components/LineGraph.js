import React, { Component } from "react"
import {Line} from 'react-chartjs-2'
import {Grid, Row, Col} from "react-bootstrap"

export default class LineGraph extends Component {

  render() {

    let dataObject = {
      data: {
          labels: this.props.label,
          datasets: [{
              label: 'Money Spent',
              data: this.props.data,
              backgroundColor: [
                  'rgba(60, 180, 75, .25)',
              ],
              borderColor: [
                  'green',
              ],
              borderWidth: 1
          }]
      },
    }

    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}>
            </Col>
            <Col md={8}>
              <Line
                data={dataObject.data}
                width={750}
                height={500}
                options={{
                  title: {
                    display: true,
                    text: "Last Three Months's Spending",
                    fontsize: 100
                  },
                  legend: {
                    display: true,
                    position: "bottom"
                  }
                }}
              />
          </Col>
          <Col md={2}>
          </Col>
        </Row>
      </Grid>
      <br/>
      <br/>
      </div>
    )
  }
}
