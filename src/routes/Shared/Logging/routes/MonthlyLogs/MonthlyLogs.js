import React, { useEffect, useCallback, useMemo } from 'react'
import { Button, Grid } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

import { monthlyLogsSelector, getMonthlyLogs } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import useStyles from './styles'
import LoggingLayout from 'routes/Shared/Logging/components/LoggingLayout'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString, generateDecrementArray, generateIncrementArray } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const MonthlyLogs = ({ getMonthlyLogs, monthlyLogs, me, pagination, location, history }) => {
  let classes = useStyles()
  const queryObj = useMemo(() => parseQueryString(location.search), [location])
  const selectedYear = parseInt(queryObj.year) || new Date().getFullYear()
  const selectedMonth = parseInt(queryObj.month) || new Date().getMonth() + 1

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
    const { owner } = queryObj
    getMonthlyLogs({
      role: me.role,
      year: selectedYear,
      month: selectedMonth,
      params: {
        pagination,
        owner
      }
    })
  }, [getMonthlyLogs, me.role, selectedMonth, selectedYear, pagination, queryObj])

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

  const viewPrevMonthLog = useCallback(() => {
    const year = selectedMonth > 1 ? selectedYear : selectedYear - 1
    const month = selectedMonth > 1 ? selectedMonth - 1 : 12

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        month
      })
    })
  }, [history, location, selectedMonth, selectedYear])

  const viewNextMonthLog = useCallback(() => {
    const year = selectedMonth < 12 ? selectedYear : selectedYear + 1
    const month = selectedMonth < 12 ? selectedMonth + 1 : 1

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        month
      })
    })
  }, [history, location, selectedMonth, selectedYear])

  const yearArray = generateDecrementArray(new Date().getFullYear(), 10)
  const monthArray = generateIncrementArray(1, 12)

  return (
    <LoggingLayout
      title="Monthly Logs"
      interval="monthly"
      logs={monthlyLogs}
      actions={
        <>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewPrevMonthLog}>
              <NavigateBefore />
            </Button>
          </Grid>
          <Grid item>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select value={selectedYear} onChange={handleYearChange} input={<Input id="year" />}>
                  {yearArray.map((year, id) => (
                    <MenuItem key={id} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="month">Month</InputLabel>
                <Select value={selectedMonth} onChange={handleMonthChange} input={<Input id="month" />}>
                  {monthArray.map((month, id) => (
                    <MenuItem key={id} value={month}>
                      {month}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewNextMonthLog}>
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} onClick={viewThisMonthLog} variant="outlined" color="primary">
              this month
            </Button>
          </Grid>
        </>
      }
    />
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
  monthlyLogs: ListDataType,
  me: PropTypes.object,
  getMonthlyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(MonthlyLogs)
