import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Shared/Dashboard'
import User from 'routes/Shared/User'
import UserNew from 'routes/Shared/User/UserNew'
import UserEdit from 'routes/Shared/User/UserEdit'
import Partner from 'routes/Shared/Partner'
import PartnerNew from 'routes/Shared/Partner/PartnerNew'
import PartnerEdit from 'routes/Shared/Partner/PartnerEdit'
import Client from 'routes/Shared/Client'
import Project from 'routes/Shared/Project'
import ProjectNew from 'routes/Shared/Project/ProjectNew'
import ProjectEdit from 'routes/Shared/Project/ProjectEdit'
import FinancialRequests from 'routes/Shared/FinancialRequest'
import Profile from 'routes/Shared/Profile'
import ProfileDetail from 'routes/Shared/Profile/ProfileEdit'
import ProfileNew from 'routes/Shared/Profile/ProfileNew'
import Account from 'routes/Shared/Account'
import Logging from 'routes/Shared/Logging'
import MyLogs from 'routes/Shared/MyLogs'
import Settings from 'routes/Shared/Settings'
import { isTeamManagerOrRedir } from 'hocs/withRoles'
import TransactionList from 'routes/Shared/Transaction/routes/TransactionList'
import TransactionDetail from 'routes/Shared/Transaction/routes/TransactionDetail'

const TeamManager = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/clients`} component={Client} />

      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/users`} component={User} />
      <Route path={`${path}/users/new`} component={UserNew} />
      <Route path={`${path}/users/:id/detail`} component={UserEdit} />
      <Route exact path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/partners/new`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/new`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route path={`${path}/financial-requests`} component={FinancialRequests} />
      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />
      <Route exact path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route path={`${path}/profiles/new`} component={ProfileNew} />
      <Route path={`${path}/logging`} component={Logging} />
      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  )
}

TeamManager.propTypes = {
  match: PropTypes.object.isRequired
}

export default isTeamManagerOrRedir(TeamManager)
