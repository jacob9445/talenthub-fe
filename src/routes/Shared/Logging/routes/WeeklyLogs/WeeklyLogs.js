import React, { useEffect, useCallback, useMemo } from 'react'
import { Grid, Button } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { format } from 'date-fns'

import { weeklyLogsSelector, getWeeklyLogs } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import LoggingLayout from 'routes/Shared/Logging/components/LoggingLayout'
import LocalizedDatePicker from 'components/LocalizedDatePicker'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString, getFirstDateOfWeek, getWeekOfMonth } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const datePickerLabelFunc = (date, invalidLabel) => {
  const weekOfMonth = getWeekOfMonth(date)
  return `Week #${weekOfMonth} of ${format(date, 'MMM. yyyy')}`
}

const WeeklyLogs = ({ getWeeklyLogs, weeklyLogs, me, pagination, location, history }) => {
  const queryObj = useMemo(() => parseQueryString(location.search), [location])
  const selectedYear = parseInt(queryObj.year) || new Date().getFullYear()
  const selectedWeek = parseInt(queryObj.week) || parseInt(format(new Date(), 'ww'))
  const firstdayOfSelectedWeek = getFirstDateOfWeek(selectedYear, selectedWeek)

  const handleDateChange = useCallback(
    date => {
      const dt = new Date(date)
      const year = dt.getFullYear()
      const week = parseInt(format(dt, 'ww'))
      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          year: year,
          week: week
        })
      })
    },
    [history, location]
  )
  useEffect(() => {
    const { owner } = queryObj
    getWeeklyLogs({
      role: me.role,
      year: selectedYear,
      week: selectedWeek - 1,
      params: {
        pagination,
        owner
      }
    })
  }, [getWeeklyLogs, me.role, selectedYear, selectedWeek, pagination, queryObj])

  const viewThisWeekLog = useCallback(() => {
    const date = new Date()
    const year = date.getFullYear()
    const week = format(date, 'ww')

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year: year,
        week: week
      })
    })
  }, [history, location])

  const viewPrevWeekLog = useCallback(() => {
    const year = selectedWeek > 1 ? selectedYear : selectedYear - 1
    const week = selectedWeek > 1 ? selectedWeek - 1 : 53

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        week
      })
    })
  }, [history, location, selectedYear, selectedWeek])

  const viewNextWeekLog = useCallback(() => {
    const year = selectedWeek < 53 ? selectedYear : selectedYear + 1
    const week = selectedWeek < 53 ? selectedWeek + 1 : 1

    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        year,
        week
      })
    })
  }, [history, location, selectedYear, selectedWeek])

  return (
    <LoggingLayout
      title="Weekly Logs"
      interval="weekly"
      logs={weeklyLogs}
      actions={
        <>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewPrevWeekLog}>
              <NavigateBefore />
            </Button>
          </Grid>
          <Grid item>
            <LocalizedDatePicker
              margin="normal"
              label="Choose a date of week"
              value={firstdayOfSelectedWeek}
              onChange={handleDateChange}
              labelFunc={datePickerLabelFunc}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewNextWeekLog}>
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewThisWeekLog}>
              This Week
            </Button>
          </Grid>
        </>
      }
    />
  )
}

const actions = {
  getWeeklyLogs
}

const selectors = createStructuredSelector({
  weeklyLogs: weeklyLogsSelector,
  me: meSelector
})

WeeklyLogs.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  getWeeklyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(WeeklyLogs)
