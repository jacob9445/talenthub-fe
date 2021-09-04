import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import LogDetail from 'routes/Logging/components/LogDetail'
import { monthlyLogDetailSelector, getMonthlyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { URL_PREFIXES } from 'config/constants'

const MonthlyLogDetail = ({ getMonthlyLogDetail, monthlyLogDetail, me, pagination, location, history, match }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getMonthlyLogDetail({
      id: id,
      role: me.role,
      params: pagination
    })
  }, [getMonthlyLogDetail, me.role, pagination, id])
  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/monthly-logs/`)
  }, [location, history, me.role])

  return <LogDetail logDetail={monthlyLogDetail} onGoBack={handleGoBack} />
}

const actions = {
  getMonthlyLogDetail
}

const selectors = createStructuredSelector({
  monthlyLogDetail: monthlyLogDetailSelector,
  me: meSelector
})

MonthlyLogDetail.propTypes = {
  monthlyLogDetail: PropTypes.object,
  me: PropTypes.object.isRequired,
  getMonthlyLogDetail: PropTypes.func.isRequired
}

export default compose(withPaginationInfo, connect(selectors, actions))(MonthlyLogDetail)
