import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import { weeklyLogDetailSelector, getWeeklyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { URL_PREFIXES } from 'config/constants'

const WeeklyLogDetail = ({ getWeeklyLogDetail, weeklyLogDetail, me, pagination, location, history, match }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getWeeklyLogDetail({
      id: id,
      role: me.role,
      params: pagination
    })
  }, [getWeeklyLogDetail, me.role, pagination, id])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/weekly-logs/`)
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

export default compose(withPaginationInfo, connect(selectors, actions))(WeeklyLogDetail)
