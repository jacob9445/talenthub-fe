import React from 'react'
import PropTypes from 'prop-types'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useTheme } from '@material-ui/styles'
import { getChartConfig } from './config'

const LineChart = ({ data }) => {
  const theme = useTheme()

  const options = getChartConfig(data, theme)

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{
        style: {
          width: '100%'
        }
      }}
    />
  )
}

LineChart.prototype = {
  data: PropTypes.array.isRequired
}

export default LineChart
