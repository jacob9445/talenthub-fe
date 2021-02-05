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
import ProjectTable from 'routes/Project/ProjectTable'
import { meSelector } from 'store/modules/auth'
const Dashboard = ({ getDashboardInfo, dashboardInfo, isLoading, me }) => {
  const classes = useStyles()

  useEffect(() => {
    getDashboardInfo()
  }, [getDashboardInfo])

  if (isLoading) return <Spinner />
  else {
    const { weekly_income, ongoing_projects } = dashboardInfo
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Weekly Income" disableWidgetMenu bodyClass={classes.wrapper} noBodyPadding>
            <WeeklyIncomeLineChart data={weekly_income} />
          </Widget>
        </Grid>
        <Grid item xs={12}>
          <Widget title="Ongoing Projects" disableWidgetMenu noBodyPadding>
            <ProjectTable data={ongoing_projects} myRole={me.role} disableActions />
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
  isLoading: dashboardInfoLoadingSelector,
  me: meSelector
})

Dashboard.prototype = {
  getDashboardInfo: PropTypes.func.isRequired,
  dashboardInfo: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  me: PropTypes.object.isRequired
}

export default connect(
  selectors,
  actions
)(Dashboard)
