import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import { weeklyLogDetailSelector, getWeeklyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const WeeklyLogDetail = ({ getWeeklyLogDetail, weeklyLogDetail, me, location, history, match }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getWeeklyLogDetail({
      id: id,
      role: me.role
    })
  }, [getWeeklyLogDetail, me.role, id])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/weekly/`)
  }, [location, history, me.role])

  return <LogDetail logDetail={weeklyLogDetail} onGoBack={handleGoBack} />
}

const actions = {
  getWeeklyLogDetail
}

const selectors = createStructuredSelector({
  weeklyLogDetail: weeklyLogDetailSelector,
  me: meSelector
})

WeeklyLogDetail.propTypes = {
  weeklyLogDetail: PropTypes.object,
  me: PropTypes.object.isRequired,
  getWeeklyLogDetail: PropTypes.func.isRequired
}

export default connect(selectors, actions)(WeeklyLogDetail)
