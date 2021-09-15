import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import DailyLogDetail from 'routes/Shared/Logging/routes/DailyLogDetail'
import DailyLogs from 'routes/Shared/Logging/routes/DailyLogs'
import MonthlyLogs from 'routes/Shared/Logging/routes/MonthlyLogs'
import MonthlyLogDetail from 'routes/Shared/Logging/routes/MonthlyLogDetail'
import WeeklyLogs from 'routes/Shared/Logging/routes/WeeklyLogs'
import WeeklyLogDetail from 'routes/Shared/Logging/routes/WeeklyLogDetail'

const Logging = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily-logs`} component={DailyLogs} />
      <Route exact path={`${path}/daily-logs/:id`} component={DailyLogDetail} />
      <Route exact path={`${path}/monthly-logs`} component={MonthlyLogs} />
      <Route exact path={`${path}/monthly-logs/:id`} component={MonthlyLogDetail} />
      <Route exact path={`${path}/weekly-logs`} component={WeeklyLogs} />
      <Route exact path={`${path}/weekly-logs/:id`} component={WeeklyLogDetail} />
      <Redirect to={`${path}/daily-logs`} />
    </Switch>
  )
}

Logging.propTypes = {
  match: PropTypes.object.isRequired
}

export default Logging
