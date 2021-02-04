import React from 'react'
import PropTypes from 'prop-types'
import { useTheme } from '@material-ui/styles'
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from 'recharts'

const WeeklyIncomeChart = ({ data }) => {
  const theme = useTheme()

  return (
    <BarChart width={350} height={350} data={data}>
      <XAxis dataKey="label" />
      <YAxis yAxisId="weekly" orientation="right" />
      <Tooltip />
      <Bar yAxisId="weekly" dataKey="income" label>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
        ))}
      </Bar>
    </BarChart>
  )
}

WeeklyIncomeChart.prototype = {
  data: PropTypes.object.isRequired
}

export default WeeklyIncomeChart
