import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import WeeklyPlusDaily from '../../components/WeeklyPlusDaily'
import {
  weeklyLogDetailSelector,
  retrieveWeeklyLog,
  weeklyLogStatusLoadingSelector,
  dailyLogsSelector,
  getDailyLogs
} from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'

const RetrieveWeeklyLog = ({ retrieveWeeklyLog, weeklyLog, weeklyLogIsLoading, me, match, getDailyLogs, interval }) => {
  const {
    params: { year, week, userId }
  } = match

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

  if (weeklyLogIsLoading) {
    return <Spinner />
  } else {
    return <WeeklyPlusDaily interval={interval} />
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

export default compose(withRouter, connect(selectors, actions))(RetrieveWeeklyLog)
