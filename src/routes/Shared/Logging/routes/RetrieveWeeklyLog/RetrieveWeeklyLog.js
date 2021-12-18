import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Typography, Paper } from '@material-ui/core'
import { startOfWeek } from 'date-fns'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import LogList from 'routes/Shared/Logging/components/LogList'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import {
  weeklyLogDetailSelector,
  retrieveWeeklyLog,
  weeklyLogStatusLoadingSelector,
  dailyLogsSelector,
  getDailyLogs
} from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import { shouldRedirect } from '../utils'

const RetrieveWeeklyLog = ({
  retrieveWeeklyLog,
  weeklyLog,
  weeklyLogIsLoading,
  me,
  location,
  history,
  match,
  interval,
  developerDailyLogs,
  getDailyLogs
}) => {
  const {
    params: { year, week, userId }
  } = match

  const classes = useStyles()

  const firstDayOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 })
  const getDeveloperDailyLogsInThisWeek = R.compose(
    R.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    R.filter(item => new Date(item.created_at) >= firstDayOfThisWeek)
  )
  const developerDailyLogsInThisWeek = developerDailyLogs
    ? getDeveloperDailyLogsInThisWeek(developerDailyLogs.results)
    : []

  useEffect(() => {
    retrieveWeeklyLog({
      role: me.role,
      year,
      week,
      params: {
        owner: userId
      }
    })
  }, [retrieveWeeklyLog, me.role, year, week, userId])

  useEffect(() => {
    getDailyLogs({
      role: me.role,
      params: {
        owner: userId
      }
    })
  }, [getDailyLogs, me.role, userId])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/`)
  }, [location, history, me.role])

  if (weeklyLogIsLoading) {
    return <Spinner />
  } else {
    return weeklyLog && shouldRedirect(weeklyLog, year, null, week, null, userId) ? (
      <Redirect to={`/${URL_PREFIXES[me.role]}/logging/weekly/${weeklyLog.id}/detail`} />
    ) : (
      <>
        <LogDetail logDetail={weeklyLog} onGoBack={handleGoBack} interval={interval} />
        <div className={classes.topSpace}>
          <Paper className={classes.navs}>
            <Typography variant="h3">Daily Logs in This Week</Typography>
          </Paper>
          <LogList data={developerDailyLogsInThisWeek} interval={interval} role={me.role} />
        </div>
      </>
    )
  }
}

const actions = {
  retrieveWeeklyLog,
  getDailyLogs
}

const selectors = createStructuredSelector({
  weeklyLog: weeklyLogDetailSelector,
  weeklyLogIsLoading: weeklyLogStatusLoadingSelector,
  me: meSelector,
  developerDailyLogs: dailyLogsSelector
})

RetrieveWeeklyLog.propTypes = {
  weeklyLog: PropTypes.object,
  me: PropTypes.object.isRequired,
  retrieveWeeklyLog: PropTypes.func.isRequired,
  getDailyLogs: PropTypes.func.isRequired
}

export default connect(selectors, actions)(RetrieveWeeklyLog)
