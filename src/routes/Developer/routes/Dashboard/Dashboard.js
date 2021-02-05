import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import useStyles from './styles'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import WeeklyIncomeLineChart from 'components/WeeklyIncomeLineChart'
import { getDashboardInfo, dashboardInfoLoadingSelector, dashbordInfoSelector } from 'store/modules/dashboard'

const Dashboard = ({ getDashboardInfo, dashboardInfo, isLoading }) => {
  const classes = useStyles()

  useEffect(() => {
    getDashboardInfo()
  }, [getDashboardInfo])

  if (isLoading) return <Spinner />
  else {
    const { weekly_income } = dashboardInfo
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={12}>
          <Widget title="Weekly Income" disableWidgetMenu bodyClass={classes.wrapper}>
            <WeeklyIncomeLineChart data={weekly_income} />
          </Widget>
        </Grid>
      </Grid>
    )
  }
}

const actions = {
  getDashboardInfo
}

const selectors = createStructuredSelector({
  dashboardInfo: dashbordInfoSelector,
  isLoading: dashboardInfoLoadingSelector
})

Dashboard.prototype = {
  getDashboardInfo: PropTypes.func.isRequired,
  dashboardInfo: PropTypes.object,
  isLoading: PropTypes.bool.isRequired
}

export default connect(
  selectors,
  actions
)(Dashboard)
