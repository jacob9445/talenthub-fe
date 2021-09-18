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
      <Route exact path={`${path}/daily`} component={DailyLogs} />
      <Route exact path={`${path}/daily/:id`} component={DailyLogDetail} />
      <Route exact path={`${path}/monthly`} component={MonthlyLogs} />
      <Route exact path={`${path}/monthly/:id`} component={MonthlyLogDetail} />
      <Route exact path={`${path}/weekly`} component={WeeklyLogs} />
      <Route exact path={`${path}/weekly/:id`} component={WeeklyLogDetail} />
      <Redirect to={`${path}/daily`} />
    </Switch>
  )
}

Logging.propTypes = {
  match: PropTypes.object.isRequired
}

export default Logging
