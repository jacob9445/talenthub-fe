import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Shared/Dashboard'
import User from 'routes/Shared/User'
import Partner from 'routes/Shared/Partner'
import Client from 'routes/Shared/Client'
import Project from 'routes/Shared/Project'
import FinancialRequests from 'routes/Shared/FinancialRequest'
import Profile from 'routes/Shared/Profile'
import Account from 'routes/Shared/Account'
import Logging from 'routes/Shared/Logging'
import MyLogs from 'routes/Shared/MyLogs'
import Settings from 'routes/Shared/Settings'
import Transaction from 'routes/Shared/Transaction'
import { isTeamManagerOrRedir } from 'hocs/withRoles'

const TeamManager = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/clients`} component={Client} />
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/financial-requests`} component={FinancialRequests} />
      <Route path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/projects`} component={Project} />
      <Route path={`${path}/users`} component={User} />
      <Route path={`${path}/logging`} component={Logging} />
      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />
      <Route path={`${path}/reports/transactions`} component={Transaction} />
    </Switch>
  )
}

TeamManager.propTypes = {
  match: PropTypes.object.isRequired
}

export default isTeamManagerOrRedir(TeamManager)
