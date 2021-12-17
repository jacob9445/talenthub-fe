import React, { useEffect, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import LogList from 'routes/Shared/Logging/components/LogList'
import Spinner from 'components/Spinner'
import useStyles from './styles'
import {
  monthlyLogDetailSelector,
  monthlyLogStatusLoadingSelector,
  weeklyLogsSelector,
  getWeeklyLogs
} from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const RetrieveMonthlyLog = ({
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
    params: { userId }
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

  useEffect(() => {
    userId &&
      getWeeklyLogs({
        role: me.role,
        params: {
          owner: userId
        }
      })
  }, [getWeeklyLogs, me.role, userId])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/`)
  }, [location, history, me.role])

  if (monthlyLogIsLoading) {
    return <Spinner />
  } else {
    return (
      <>
        <LogDetail logDetail={monthlyLog} onGoBack={handleGoBack} interval={interval} />
        {developerWeeklyLogsInThisMonth[0] && (
          <div className={classes.topSpace}>
            <hr />
            <Typography className={classes.topSpace} variant="h3">
              Weekly Logs in This Month
            </Typography>
            <LogList data={developerWeeklyLogsInThisMonth} interval={interval} role={me.role} />
          </div>
        )}
      </>
    )
  }
}

const actions = {
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
  monthlyLogIsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired,
  getWeeklyLogs: PropTypes.func.isRequired,
  developerWeeklyLogs: PropTypes.object
}

export default connect(selectors, actions)(withRouter(RetrieveMonthlyLog))
