import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { format } from 'date-fns'
import { DatePicker } from 'material-ui-pickers'

import { weeklyLogsSelector, getWeeklyLogs } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import WeeklyLogTable from '../../components/LogsTable'
import Widget from 'components/Widget'
import useStyles from './styles'
import { ROLES } from 'config/constants'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { parseQueryString, jsonToQueryString, getFirstDateOfWeek, getWeekOfMonth } from 'helpers/utils'
import { ListDataType } from 'helpers/prop-types'

const datePickerLabelFunc = (date, invalidLabel) => {
  const weekOfMonth = getWeekOfMonth(date)
  return `Week #${weekOfMonth} of ${format(date, 'MMM. yyyy')}`
}

const WeeklyLogs = ({ getWeeklyLogs, logs, me, pagination, location, history, onChangePage, onChangeRowsPerPage }) => {
  let classes = useStyles()
  const queryObj = parseQueryString(location.search)
  const selectedYear = queryObj.year || new Date().getFullYear()
  const selectedWeek = parseInt(queryObj.week) - 1 || parseInt(format(new Date(), 'ww')) - 1
  const firstdayOfSelectedWeek = getFirstDateOfWeek(selectedYear, selectedWeek + 1)
  const handleDateChange = useCallback(
    date => {
      const year = date.getFullYear()
      const week = parseInt(format(date, 'ww'))
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
    getWeeklyLogs({
      role: me.role,
      year: selectedYear,
      week: selectedWeek,
      params: pagination
    })
  }, [getWeeklyLogs, me.role, selectedYear, selectedWeek, pagination])

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

  return (
    <Widget
      title="Weekly Logs"
      upperTitle
      noBodyPadding
      bodyClass={classes.tableOverflow}
      disableWidgetMenu
      disableWidgetButton={me.role !== ROLES.ADMIN}
      WidgetButton={
        <Grid container className={classes.grid} spacing={2} alignItems="center" justify="flex-end">
          <Grid item>
            <DatePicker
              margin="normal"
              label="Choose a date of week"
              value={firstdayOfSelectedWeek}
              onChange={handleDateChange}
              labelFunc={datePickerLabelFunc}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="primary" onClick={viewThisWeekLog}>
              This Week
            </Button>
          </Grid>
        </Grid>
      }>
      <WeeklyLogTable
        data={logs}
        myRole={me.role}
        pagination={pagination}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </Widget>
  )
}

const actions = {
  getWeeklyLogs
}

const selectors = createStructuredSelector({
  logs: weeklyLogsSelector,
  me: meSelector
})

WeeklyLogs.propTypes = {
  logs: ListDataType,
  me: PropTypes.object,
  getWeeklyLogs: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(WeeklyLogs)
