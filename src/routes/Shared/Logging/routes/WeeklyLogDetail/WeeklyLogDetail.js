import React, { useEffect } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import WeeklyPlusDaily from '../../components/WeeklyPlusDaily/WeeklyPlusDaily'
import { weeklyLogDetailSelector, getWeeklyLogDetail } from 'store/modules/logging'
import { meSelector } from 'store/modules/auth'

const WeeklyLogDetail = ({ getWeeklyLogDetail, me, match, interval }) => {
  const {
    params: { id }
  } = match
  useEffect(() => {
    getWeeklyLogDetail({
      id: id,
      role: me.role,
      useCache: true
    })
  }, [getWeeklyLogDetail, me.role, id])

  return <WeeklyPlusDaily interval={interval} />
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
