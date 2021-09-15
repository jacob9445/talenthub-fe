import React, { useEffect, useCallback } from 'react'
import { Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import { monthlyLogsSelector, getMonthlyLogs } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import LogsTable from '../../components/LogsTable'
import Widget from 'components/Widget'
import useStyles from './styles'
import { ROLES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString, generateDecrementArray, generateIncrementArray } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const MonthlyLogs = ({
  getMonthlyLogs,
  monthlyLogs,
  me,
  pagination,
  location,
  history,
  onChangePage,
  onChangeRowsPerPage
}) => {
  let classes = useStyles()
  const queryObj = parseQueryString(location.search)
  const selectedYear = queryObj.year || new Date().getFullYear()
  const selectedMonth = queryObj.month || new Date().getMonth() + 1
  const handleYearChange = useCallback(
    eve => {
      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          year: eve.target.value,
          month: selectedMonth
        })
      })
    },
    [history, location, selectedMonth]
  )
  const handleMonthChange = useCallback(
    eve => {
      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          year: selectedYear,
          month: eve.target.value
        })
      })
    },
    [history, location, selectedYear]
  )
  useEffect(() => {
    getMonthlyLogs({
      role: me.role,
      year: selectedYear,
      month: selectedMonth,
      params: pagination
    })
  }, [getMonthlyLogs, me.role, selectedMonth, selectedYear, pagination])

  const viewThisMonthLog = useCallback(() => {
    const date = new Date()
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year: date.getFullYear(),
        month: date.getMonth() + 1
      })
    })
  }, [history, location])

  const yearArray = generateDecrementArray(new Date().getFullYear(), 10)
  const monthArray = generateIncrementArray(1, 12)

  return (
    <Widget
      title="Monthly Logs"
      upperTitle
      noBodyPadding
      bodyClass={classes.tableOverflow}
      disableWidgetMenu
      disableWidgetButton={me.role !== ROLES.ADMIN}
      WidgetButton={
        <Grid className={classes.selectMonth}>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="year">Year</InputLabel>
              <Select value={selectedYear} onChange={handleYearChange} input={<Input id="year" />}>
                {yearArray.map(year => (
                  <MenuItem value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="month">Month</InputLabel>
              <Select value={selectedMonth} onChange={handleMonthChange} input={<Input id="month" />}>
                {monthArray.map(month => (
                  <MenuItem value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </form>
          <Button className={classes.button} onClick={viewThisMonthLog} variant="outlined" color="primary">
            this month
          </Button>
        </Grid>
      }>
      <LogsTable
        data={monthlyLogs}
        role={me.role}
        interval="monthly-logs"
        pagination={pagination}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Widget>
  )
}

const actions = {
  getMonthlyLogs
}

const selectors = createStructuredSelector({
  monthlyLogs: monthlyLogsSelector,
  me: meSelector
})

MonthlyLogs.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  getMonthlyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(MonthlyLogs)
