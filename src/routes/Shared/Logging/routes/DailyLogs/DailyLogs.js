import React, { useEffect, useCallback, useMemo } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { format } from 'date-fns'
import { Grid, Button } from '@material-ui/core'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'
import PropTypes from 'prop-types'

import withPaginationInfo from 'hocs/withPaginationInfo'
import LoggingLayout from 'routes/Shared/Logging/components/LoggingLayout'
import LocalizedDatePicker from 'components/LocalizedDatePicker'
import { parseQueryString, jsonToQueryString } from 'helpers/utils'
import { meSelector } from 'store/modules/auth'
import { ListDataType } from 'helpers/prop-types'
import { dailyLogsSelector, getDailyLogs } from 'store/modules/logging'

const DailyLogs = ({ getDailyLogs, dailyLogs, me, pagination, location, history, match }) => {
  const queryObj = useMemo(() => parseQueryString(location.search), [location])
  const selectedDate = queryObj.date || format(new Date(), 'yyyy-MM-dd')

  const oneDayPeriod = 86400000
  const previousDateOfSelectedDate = useMemo(() => new Date(new Date(selectedDate).getTime() - oneDayPeriod), [
    selectedDate
  ])
  const nextDateofSelectedDate = useMemo(() => new Date(new Date(selectedDate).getTime() + oneDayPeriod), [
    selectedDate
  ])

  const handleDateChange = useCallback(
    date => {
      history.push({
        search: jsonToQueryString({
          ...parseQueryString(location.search),
          date
        })
      })
    },
    [history, location]
  )
  useEffect(() => {
    const { owner } = queryObj
    getDailyLogs({
      role: me.role,
      date: selectedDate,
      params: {
        pagination,
        owner
      }
    })
  }, [getDailyLogs, me.role, selectedDate, pagination, queryObj])

  const viewTodayLog = useCallback(() => {
    const date = Date.now()
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(date, 'yyyy-MM-dd')
      })
    })
  }, [history, location])

  const viewPrevDayLog = useCallback(() => {
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(previousDateOfSelectedDate, 'yyyy-MM-dd')
      })
    })
  }, [history, location, previousDateOfSelectedDate])

  const viewNextDayLog = useCallback(() => {
    history.push({
      search: jsonToQueryString({
        ...parseQueryString(location.search),
        date: format(nextDateofSelectedDate, 'yyyy-MM-dd')
      })
    })
  }, [history, location, nextDateofSelectedDate])

  return (
    <LoggingLayout
      title="Daily Logs"
      interval="daily"
      logs={dailyLogs}
      actions={
        <>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewPrevDayLog}>
              <NavigateBefore />
            </Button>
          </Grid>
          <Grid item>
            <LocalizedDatePicker
              margin="normal"
              label="Choose a date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewNextDayLog}>
              <NavigateNext />
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewTodayLog}>
              Today
            </Button>
          </Grid>
        </>
      }
    />
  )
}

const actions = {
  getDailyLogs
}

const selectors = createStructuredSelector({
  dailyLogs: dailyLogsSelector,
  me: meSelector
})

DailyLogs.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  getDailyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(DailyLogs)
