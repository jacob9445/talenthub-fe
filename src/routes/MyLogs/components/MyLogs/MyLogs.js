import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import MyDailyLogs from 'routes/MyLogs/routes/MyDailyLogs'

const MyLogs = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily`} component={MyDailyLogs} />
      <Redirect to={`${path}/daily`} />
    </Switch>
  )
}

export default MyLogs
