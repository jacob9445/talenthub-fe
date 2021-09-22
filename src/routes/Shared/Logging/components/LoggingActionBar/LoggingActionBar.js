import React, { useCallback, useEffect } from 'react'
import { Button, Grid, FormControl, MenuItem, Input, InputLabel, Select } from '@material-ui/core'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { DatePicker } from 'material-ui-pickers'
import { format } from 'date-fns'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { meSelector } from 'store/modules/auth'
import { getUserDetail, userDetailSelector } from 'store/modules/user'
import Widget from 'components/Widget'
import SimpleSelect from 'components/SimpleSelect'
import { getFullName, generateDecrementArray, generateIncrementArray } from 'helpers/utils'
import { getDate, datePickerLabelFunc } from '../../routes/utils'
import { LOG_OPTIONS, URL_PREFIXES, INTERVALS } from 'config/constants'
import useStyles from './styles'

const LoggingActionBar = ({ logDetail, history, match, me, user, getUserDetail, interval }) => {
  const {
    params: { year, month, day, week, userId }
  } = match
  const date = logDetail ? logDetail.created_at : undefined
  let classes = useStyles()

  useEffect(() => {
    getUserDetail(userId)
  }, [getUserDetail, userId])

  const fullName = logDetail ? getFullName(logDetail.owner) : getFullName(user)
  const selectedDate = getDate(date, year, month, week, day)
  const selectedUserId = logDetail ? logDetail.owner.id : parseInt(userId)
  const selectedYear = date ? new Date(date).getFullYear() : parseInt(year)
  const selectedMonth = date ? new Date(date).getMonth() + 2 : parseInt(month)

  const handleIntervalChange = useCallback(
    event => {
      const interval = event.target.value
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const day = today.getDate()
      const week = format(today, 'ww') - 1

      switch (interval) {
        case INTERVALS.DAILY:
          history.push(`/${URL_PREFIXES[me.role]}/logging/daily/${year}-${month}-${day}/${selectedUserId}`)
          break
        case INTERVALS.WEEKLY:
          history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/${year}-${week}/${selectedUserId}`)
          break
        case INTERVALS.MONTHLY:
          history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/${year}-${month}/${selectedUserId}`)
          break
        default:
          break
      }
    },
    [history, me.role, selectedUserId]
  )

  const handleDateChange = useCallback(
    date => {
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      history.push(`/${URL_PREFIXES[me.role]}/logging/daily/${year}-${month}-${day}/${selectedUserId}`)
    },
    [history, selectedUserId, me.role]
  )

  const handleWeekChange = useCallback(
    date => {
      const year = date.getFullYear()
      const week = parseInt(format(date, 'ww')) - 1
      history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/${year}-${week}/${selectedUserId}`)
    },
    [history, selectedUserId, me.role]
  )

  const handleYearChange = useCallback(
    event => {
      const year = event.target.value
      history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/${year}-${selectedMonth}/${selectedUserId}`)
    },
    [history, selectedMonth, me.role, selectedUserId]
  )

  const handleMonthChange = useCallback(
    event => {
      const month = event.target.value
      history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/${selectedYear}-${month}/${selectedUserId}`)
    },
    [history, selectedYear, me.role, selectedUserId]
  )

  const handleTodayClick = useCallback(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    history.push(`/${URL_PREFIXES[me.role]}/logging/daily/${year}-${month}-${day}/${selectedUserId}`)
  }, [history, selectedUserId, me.role])

  const handleThisWeekClick = useCallback(() => {
    const today = new Date()
    const year = today.getFullYear()
    const week = parseInt(format(today, 'ww')) - 1
    history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/${year}-${week}/${selectedUserId}`)
  }, [history, selectedUserId, me.role])

  const handleThisMonthClick = useCallback(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/${year}-${month}/${selectedUserId}`)
  }, [history, selectedUserId, me.role])

  const yearArray = generateDecrementArray(new Date().getFullYear(), 10)
  const monthArray = generateIncrementArray(1, 12)

  return (
    <Widget
      title={fullName}
      disableWidgetMenu
      WidgetButton={
        <Grid container className={classes.grid} spacing={2} alignItems="center" justify="flex-end">
          <Grid item>
            <SimpleSelect label="Period" value={interval} options={LOG_OPTIONS} onChange={handleIntervalChange} />
          </Grid>
          {interval === INTERVALS.DAILY ? (
            <>
              <Grid item>
                <DatePicker margin="normal" label="Choose a date" value={selectedDate} onChange={handleDateChange} />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={handleTodayClick}>
                  Today
                </Button>
              </Grid>
            </>
          ) : interval === INTERVALS.WEEKLY ? (
            <>
              <Grid item>
                <DatePicker
                  margin="normal"
                  label="Choose a date of week"
                  value={selectedDate}
                  onChange={handleWeekChange}
                  labelFunc={datePickerLabelFunc}
                />
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary" onClick={handleThisWeekClick}>
                  This Week
                </Button>
              </Grid>
            </>
          ) : (
            <>
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
                <Button className={classes.button} onClick={handleThisMonthClick} variant="outlined" color="primary">
                  this month
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      }></Widget>
  )
}

const selectors = createStructuredSelector({
  me: meSelector,
  user: userDetailSelector
})

const actions = {
  getUserDetail
}

LoggingActionBar.propTypes = {
  logDetail: PropTypes.object,
  history: PropTypes.object.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getUserDetail: PropTypes.func.isRequired
}

export default compose(withRouter, connect(selectors, actions))(LoggingActionBar)
