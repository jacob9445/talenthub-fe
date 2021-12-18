import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Typography, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import LogList from 'routes/Shared/Logging/components/LogList'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import {
  monthlyLogDetailSelector,
  retrieveMonthlyLog,
  monthlyLogStatusLoadingSelector,
  weeklyLogsSelector,
  getWeeklyLogs
} from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import { shouldRedirect } from '../utils'

const RetrieveMonthlyLog = ({
  retrieveMonthlyLog,
  monthlyLog,
  monthlyLogIsLoading,
  me,
  location,
  history,
  match,
  interval,
  developerWeeklyLogs,
  getWeeklyLogs
}) => {
  const {
    params: { year, month, userId }
  } = match

  const classes = useStyles()

  const firstDayOfThisMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

  const firstDayOfFirstWeek = new Date(
    firstDayOfThisMonth.setDate(firstDayOfThisMonth.getDate() - firstDayOfThisMonth.getDay())
  )

  const getDeveloperWeeklyLogsInThisMonth = R.compose(
    R.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    R.filter(item => new Date(item.created_at) >= firstDayOfFirstWeek)
  )
  const developerWeeklyLogsInThisMonth = developerWeeklyLogs
    ? getDeveloperWeeklyLogsInThisMonth(developerWeeklyLogs.results)
    : []

  console.log('XCV', firstDayOfFirstWeek)

  useEffect(() => {
    retrieveMonthlyLog({
      role: me.role,
      year,
      month,
      params: {
        owner: userId
      }
    })
  }, [retrieveMonthlyLog, me.role, year, month, userId])

  useEffect(() => {
    getWeeklyLogs({
      role: me.role,
      params: {
        owner: userId
      }
    })
  }, [getWeeklyLogs, me.role, userId])

  console.log({ developerWeeklyLogsInThisMonth })

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/`)
  }, [location, history, me.role])

  if (monthlyLogIsLoading) {
    return <Spinner />
  } else {
    return monthlyLog && shouldRedirect(monthlyLog, year, month, null, null, userId) ? (
      <Redirect to={`/${URL_PREFIXES[me.role]}/logging/monthly/${monthlyLog.id}/detail`} />
    ) : (
      <>
        <LogDetail logDetail={monthlyLog} onGoBack={handleGoBack} interval={interval} />
        <div className={classes.topSpace}>
          <Paper className={classes.navs}>
            <Typography variant="h3">Weekly Logs in This Month</Typography>
          </Paper>
          <LogList data={developerWeeklyLogsInThisMonth} interval={interval} role={me.role} />
        </div>
      </>
    )
  }
}

const actions = {
  retrieveMonthlyLog,
  getWeeklyLogs
}

const selectors = createStructuredSelector({
  monthlyLog: monthlyLogDetailSelector,
  monthlyLogIsLoading: monthlyLogStatusLoadingSelector,
  me: meSelector,
  developerWeeklyLogs: weeklyLogsSelector
})

RetrieveMonthlyLog.propTypes = {
  monthlyLog: PropTypes.object,
  me: PropTypes.object.isRequired,
  retrieveMonthlyLog: PropTypes.func.isRequired,
  getWeeklyLogs: PropTypes.func.isRequired
}

export default connect(selectors, actions)(RetrieveMonthlyLog)
