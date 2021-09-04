import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import DailyLogDetail from 'routes/Logging/routes/DailyLogDetail'
import DailyLogs from 'routes/Logging/routes/DailyLogs'
import MonthlyLogs from 'routes/Logging/routes/MonthlyLogs'
import MonthlyLogDetail from 'routes/Logging/routes/MonthlyLogDetail'

const Logging = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily-logs`} component={DailyLogs} />
      <Route exact path={`${path}/daily-logs/:id`} component={DailyLogDetail} />
      <Route exact path={`${path}/monthly-logs`} component={MonthlyLogs} />
      <Route exact path={`${path}/monthly-logs/:id`} component={MonthlyLogDetail} />
      <Redirect to={`${path}/daily-logs`} />
    </Switch>
  )
}

export default Logging
