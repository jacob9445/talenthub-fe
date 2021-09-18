import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import { dailyLogDetailSelector, getDailyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { URL_PREFIXES } from 'config/constants'

const DailyLogDetail = ({ getDailyLogDetail, dailyLogDetail, me, pagination, location, history, match }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getDailyLogDetail({
      id: id,
      role: me.role,
      params: pagination
    })
  }, [getDailyLogDetail, me.role, pagination, id])

  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/daily/`)
  }, [location, history, me.role])

  return <LogDetail logDetail={dailyLogDetail} onGoBack={handleGoBack} />
}

const actions = {
  getDailyLogDetail
}

const selectors = createStructuredSelector({
  dailyLogDetail: dailyLogDetailSelector,
  me: meSelector
})

DailyLogDetail.propTypes = {
  dailyLogDetail: PropTypes.object,
  me: PropTypes.object.isRequired,
  getDailyLogDetail: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(DailyLogDetail)
