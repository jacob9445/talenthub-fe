import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Shared/Dashboard'
import User from 'routes/Shared/User'
import Team from './routes/Team'
import Profile from 'routes/Shared/Profile'
import Account from 'routes/Shared/Account'
import Partner from 'routes/Shared/Partner'
import Client from 'routes/Shared/Client'
import Project from 'routes/Shared/Project'
import FinancialRequests from 'routes/Shared/FinancialRequest'
import IndividualReport from './routes/IndividualReport'
import TeamReport from './routes/TeamReport'
import Logging from 'routes/Shared/Logging'
import MyLogs from 'routes/Shared/MyLogs'
import Settings from 'routes/Shared/Settings'
import TransactionList from 'routes/Shared/Transaction/routes/TransactionList'
import TransactionDetail from 'routes/Shared/Transaction/routes/TransactionDetail'
import { isAdminOrRedir } from 'hocs/withRoles'

const Admin = ({ match: { path } }) => {
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
      <Route path={`${path}/teams`} component={Team} />
      <Route path={`${path}/logging`} component={Logging} />
      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />

      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />
      <Route exact path={`${path}/individual-reports`} component={IndividualReport} />
      <Route exact path={`${path}/team-reports`} component={TeamReport} />
      <Route exact path={`${path}/transaction-reports`} component={TransactionList} />
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
