import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import Spinner from 'components/Spinner'
import { weeklyLogDetailSelector, retrieveWeeklyLog, weeklyLogStatusLoadingSelector } from 'store/modules/logging'
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
  interval
}) => {
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

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/`)
  }, [location, history, me.role])

  if (weeklyLogIsLoading) {
    return <Spinner />
  } else {
    return weeklyLog && shouldRedirect(weeklyLog, year, null, week, null, userId) ? (
      <Redirect to={`/${URL_PREFIXES[me.role]}/logging/weekly/${weeklyLog.id}/detail`} />
    ) : (
      <LogDetail logDetail={weeklyLog} onGoBack={handleGoBack} interval={interval} />
    )
  }
}

const actions = {
  retrieveWeeklyLog
}

const selectors = createStructuredSelector({
  weeklyLog: weeklyLogDetailSelector,
  weeklyLogIsLoading: weeklyLogStatusLoadingSelector,
  me: meSelector
})

RetrieveWeeklyLog.propTypes = {
  weeklyLog: PropTypes.object,
  me: PropTypes.object.isRequired,
  retrieveWeeklyLog: PropTypes.func.isRequired
}

export default connect(selectors, actions)(RetrieveWeeklyLog)
