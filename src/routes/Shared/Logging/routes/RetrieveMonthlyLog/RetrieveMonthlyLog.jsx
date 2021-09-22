import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import Spinner from 'components/Spinner'
import { monthlyLogsSelector, retrieveMonthlyLog, monthlyLogStatusLoadingSelector } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const RetrieveMonthlyLog = ({ retrieveMonthlyLog, monthlyLog, monthlyLogIsLoading, me, location, history, match }) => {
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

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/`)
  }, [location, history, me.role])

  if (monthlyLogIsLoading) {
    return <Spinner />
  } else {
    return <LogDetail logDetail={monthlyLog} onGoBack={handleGoBack} />
  }
}

const actions = {
  retrieveMonthlyLog
}

const selectors = createStructuredSelector({
  monthlyLog: monthlyLogsSelector,
  monthlyLogIsLoading: monthlyLogStatusLoadingSelector,
  me: meSelector
})

RetrieveMonthlyLog.propTypes = {
  monthlyLog: PropTypes.object,
  me: PropTypes.object.isRequired,
  retrieveMonthlyLog: PropTypes.func.isRequired
}

export default connect(selectors, actions)(RetrieveMonthlyLog)
