import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import { startOfWeek, endOfWeek } from 'date-fns'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import LogList from 'routes/Shared/Logging/components/LogList'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import {
  weeklyLogDetailSelector,
  weeklyLogStatusLoadingSelector,
  dailyLogsSelector,
  getDailyLogs
} from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const RetrieveWeeklyLog = ({
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
    params: { userId, week, year }
  } = match

  const classes = useStyles()

  const getDateOfWeek = (w, y) => {
    var d = 1 + w * 7

    return new Date(y, 0, d)
  }

  const selectedDate = week ? getDateOfWeek(week, year) : new Date()
  const firstDayOfThisWeek = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const lastDayofThisWeek = endOfWeek(selectedDate, { weekStartsOn: 1 })
  const getDeveloperDailyLogsInThisWeek = R.compose(
    R.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    R.filter(item => new Date(item.created_at) >= firstDayOfThisWeek),
    R.filter(item => new Date(item.created_at) <= lastDayofThisWeek)
  )
  const developerDailyLogsInThisWeek = developerDailyLogs
    ? getDeveloperDailyLogsInThisWeek(developerDailyLogs.results)
    : []

  useEffect(() => {
    userId &&
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
    return (
      <>
        <LogDetail logDetail={weeklyLog} onGoBack={handleGoBack} interval={interval} />
        {developerDailyLogsInThisWeek[0] && (
          <div className={classes.topSpace}>
            <hr />
            <Typography className={classes.topSpace} variant="h3">
              Daily Logs in This Week
            </Typography>
            <LogList data={developerDailyLogsInThisWeek} interval={interval} role={me.role} />
          </div>
        )}
      </>
    )
  }
}

const actions = {
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
  weeklyLogIsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  getDailyLogs: PropTypes.func.isRequired,
  developerDailyLogs: PropTypes.object,
  interval: PropTypes.string.isRequired
}

export default connect(selectors, actions)(withRouter(RetrieveWeeklyLog))
