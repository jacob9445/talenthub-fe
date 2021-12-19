import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import MonthlyPlusWeekly from '../../components/MonthlyPlusWeekly/MonthlyPlusWeekly'
import { monthlyLogDetailSelector, getMonthlyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'

const MonthlyLogDetail = ({ getMonthlyLogDetail, me, match, interval }) => {
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

  return <MonthlyPlusWeekly interval={interval} />
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
