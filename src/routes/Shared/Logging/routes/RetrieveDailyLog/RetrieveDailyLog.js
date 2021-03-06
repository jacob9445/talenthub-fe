import React, { useCallback, useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import { dailyLogDetailSelector, dailyLogStatusLoadingSelector, retrieveDailyLog } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import Spinner from 'components/Spinner'
import { shouldRedirect } from '../utils'

const RetrieveDailyLog = ({
  retrieveDailyLog,
  isDailyLogLoading,
  dailyLog,
  me,
  location,
  history,
  match,
  interval
}) => {
  const {
    params: { year, month, day, userId }
  } = match
  const selectedDate = format(new Date(year, month - 1, day), 'yyyy-MM-dd') || format(new Date(), 'yyyy-MM-dd')

  useEffect(() => {
    retrieveDailyLog({
      date: selectedDate,
      params: {
        owner: userId
      }
    })
  }, [retrieveDailyLog, me.role, selectedDate, userId])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/daily/`)
  }, [location, history, me.role])

  if (isDailyLogLoading) {
    return <Spinner />
  } else {
    return dailyLog && shouldRedirect(dailyLog, year, month, null, day, userId) ? (
      <Redirect to={`/${URL_PREFIXES[me.role]}/logging/daily/${dailyLog.id}/detail`} />
    ) : (
      <LogDetail logDetail={dailyLog} onGoBack={handleGoBack} interval={interval} />
    )
  }
}

const actions = {
  retrieveDailyLog
}

const selectors = createStructuredSelector({
  dailyLog: dailyLogDetailSelector,
  isDailyLogLoading: dailyLogStatusLoadingSelector,
  me: meSelector
})

RetrieveDailyLog.propTypes = {
  dailyLog: PropTypes.object,
  me: PropTypes.object.isRequired,
  retrieveDailyLog: PropTypes.func.isRequired
}

export default connect(selectors, actions)(RetrieveDailyLog)
