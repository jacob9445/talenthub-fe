import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import useStyles from './styles'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import WeeklyIncomeChart from 'components/WeeklyIncomeChart'
import { getDashboardInfo, dashboardInfoLoadingSelector, dashbordInfoSelector } from 'store/modules/dashboard'

const Dashboard = ({ getDashboardInfo, dashboardInfo, isLoading }) => {
  const classes = useStyles()

  useEffect(() => {
    getDashboardInfo()
  }, [getDashboardInfo])

  const weeklyIncomeData = useMemo(() => {
    if (!isLoading) {
      const { weekly_income } = dashboardInfo
      const weeks = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri']
      return weekly_income.map((value, index) => ({
        label: weeks[index],
        income: value
      }))
    } else return null
  }, [dashboardInfo, isLoading])

  if (isLoading) return <Spinner />
  else
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Widget title="Weekly Incoming" disableWidgetMenu bodyClass={classes.wrapper}>
            <WeeklyIncomeChart data={weeklyIncomeData} />
          </Widget>
        </Grid>
      </Grid>
    )
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
