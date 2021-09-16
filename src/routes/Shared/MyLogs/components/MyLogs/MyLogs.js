import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import MyDailyLogs from 'routes/Shared/MyLogs/routes/MyDailyLogs'
import MyMonthlyLogs from 'routes/Shared/MyLogs/routes/MyMonthlyLogs'
import MyWeeklyLogs from 'routes/Shared/MyLogs/routes/MyWeeklyLogs'

const MyLogs = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/daily`} component={MyDailyLogs} />
      <Route exact path={`${path}/monthly`} component={MyMonthlyLogs} />
      <Route exact path={`${path}/weekly`} component={MyWeeklyLogs} />
      <Redirect to={`${path}/daily`} />
    </Switch>
  )
}

MyLogs.propTypes = {
  match: PropTypes.object.isRequired
}

export default MyLogs
