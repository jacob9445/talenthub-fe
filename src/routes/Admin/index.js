import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Shared/Dashboard'
import UserEdit from 'routes/Shared/User/UserEdit'
import User from 'routes/Shared/User'
import UserNew from 'routes/Shared/User/UserNew'
import Team from './routes/Team'
import Profile from 'routes/Shared/Profile'
import ProfileDetail from 'routes/Shared/Profile/ProfileEdit'
import ProfileNew from 'routes/Shared/Profile/ProfileNew'
import Account from 'routes/Shared/Account'
import AccountEdit from 'routes/Shared/Account/AccountEdit'
import AccountNew from 'routes/Shared/Account/AccountNew'
import Partner from 'routes/Shared/Partner'
import PartnerNew from 'routes/Shared/Partner/PartnerNew'
import PartnerEdit from 'routes/Shared/Partner/PartnerEdit'
import Client from 'routes/Shared/Client'
import ClientNew from 'routes/Shared/Client/ClientNew'
import ClientEdit from 'routes/Shared/Client/ClientEdit'
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
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/users`} component={User} />
      <Route path={`${path}/users/new`} component={UserNew} />
      <Route path={`${path}/users/:id/detail`} component={UserEdit} />
      <Route path={`${path}/teams`} component={Team} />
      <Route exact path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route exact path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/accounts/:id/detail`} component={AccountEdit} />
      <Route path={`${path}/accounts/new`} component={AccountNew} />
      <Route exact path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/partners/new`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${path}/clients`} component={Client} />
      <Route path={`${path}/clients/new`} component={ClientNew} />
      <Route path={`${path}/clients/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/new`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route path={`${path}/financial-requests`} component={FinancialRequests} />
      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />
      <Route exact path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route path={`${path}/profiles/new`} component={ProfileNew} />
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
