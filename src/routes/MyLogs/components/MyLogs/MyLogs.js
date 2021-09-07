import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import MyDailyLogs from 'routes/MyLogs/routes/MyDailyLogs'
import MyMonthlyLogs from 'routes/MyLogs/routes/MyMonthlyLogs'

const MyLogs = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily`} component={MyDailyLogs} />
      <Route exact path={`${path}/monthly`} component={MyMonthlyLogs} />
      <Redirect to={`${path}/daily`} />
    </Switch>
  )
}

export default MyLogs
