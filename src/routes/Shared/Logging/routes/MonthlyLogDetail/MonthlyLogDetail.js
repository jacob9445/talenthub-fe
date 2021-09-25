import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LogDetail from 'routes/Shared/Logging/components/LogDetail'
import { monthlyLogDetailSelector, getMonthlyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'

const MonthlyLogDetail = ({ getMonthlyLogDetail, monthlyLogDetail, me, location, history, match, interval }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getMonthlyLogDetail({
      id: id,
      role: me.role,
      useCache: true
    })
  }, [getMonthlyLogDetail, me.role, id])
  const handleGoBack = useCallback(() => {
    location.state ? history.push(location.state) : history.push(`/${URL_PREFIXES[me.role]}/logging/monthly/`)
  }, [location, history, me.role])
  return <LogDetail logDetail={monthlyLogDetail} onGoBack={handleGoBack} interval={interval} />
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

export default connect(selectors, actions)(MonthlyLogDetail)
