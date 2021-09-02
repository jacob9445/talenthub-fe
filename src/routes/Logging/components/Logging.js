import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import DailyLogDetail from '../routes/DailyReports/routes/DailyLogDetail'
import DailyLogs from '../routes/DailyReports/'

const Logging = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily-logs`} component={DailyLogs} />
      <Route exact path={`${path}/daily-logs/:id`} component={DailyLogDetail} />
      <Redirect to={`${path}/daily-logs`} />
    </Switch>
  )
}

export default Logging
