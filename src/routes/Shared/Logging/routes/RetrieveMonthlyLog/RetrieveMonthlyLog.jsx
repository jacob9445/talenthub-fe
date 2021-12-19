import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Spinner from 'components/Spinner'
import MonthlyPlusWeekly from '../../components/MonthlyPlusWeekly'
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
  match,
  getWeeklyLogs,
  interval
}) => {
  const {
    params: { year, month, userId }
  } = match

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

  if (monthlyLogIsLoading) {
    return <Spinner />
  } else {
    return monthlyLog && shouldRedirect(monthlyLog, year, month, null, null, userId) ? (
      <Redirect to={`/${URL_PREFIXES[me.role]}/logging/monthly/${monthlyLog.id}/detail`} />
    ) : (
      <MonthlyPlusWeekly interval={interval} />
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
