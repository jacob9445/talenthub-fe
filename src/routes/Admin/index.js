import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Shared/Dashboard'
import UserEdit from 'routes/Shared/User/UserEdit'
import User from 'routes/Shared/User'
import UserNew from 'routes/Shared/User/UserNew'
import Team from './routes/Team'
import Profile from 'routes/Shared/Profile'
import Account from 'routes/Shared/Account'
import Partner from 'routes/Shared/Partner'
import Client from 'routes/Shared/Client'
import Project from 'routes/Shared/Project'
import ProjectNew from 'routes/Shared/Project/ProjectNew'
import ProjectEdit from 'routes/Shared/Project/ProjectEdit'
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

      <Route exact path={`${path}/users`} component={User} />
      <Route path={`${path}/users/new`} component={UserNew} />
      <Route path={`${path}/users/:id/detail`} component={UserEdit} />
      <Route path={`${path}/teams`} component={Team} />
      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/new`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />
      <Route exact path={`${path}/individual-reports`} component={IndividualReport} />
      <Route exact path={`${path}/team-reports`} component={TeamReport} />
      <Route exact path={`${path}/transaction-reports`} component={TransactionList} />
      <Route path={`${path}/logging`} component={Logging} />
      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
