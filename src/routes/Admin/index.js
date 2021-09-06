import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from 'routes/Dashboard'
import UserEdit from 'routes/User/UserEdit'
import User from 'routes/User'
import UserNew from 'routes/User/UserNew'
import Team from './routes/Team'
import Profile from 'routes/Profile'
import ProfileDetail from 'routes/Profile/ProfileEdit'
import ProfileNew from 'routes/Profile/ProfileNew'
import Account from 'routes/Account'
import AccountEdit from 'routes/Account/AccountEdit'
import AccountNew from 'routes/Account/AccountNew'
import { isAdminOrRedir } from 'hocs/withRoles'
import Partner from 'routes/Partner'
import PartnerNew from 'routes/Partner/PartnerNew'
import PartnerEdit from 'routes/Partner/PartnerEdit'
import Client from 'routes/Client'
import ClientNew from 'routes/Client/ClientNew'
import ClientEdit from 'routes/Client/ClientEdit'
import Project from 'routes/Project'
import ProjectNew from 'routes/Project/ProjectNew'
import ProjectEdit from 'routes/Project/ProjectEdit'
import FinancialRequest from 'routes/FinancialRequest'
import FinancialRequestEdit from 'routes/FinancialRequest/FinancialRequestEdit'
import FinancialRequestNew from 'routes/FinancialRequest/FinancialRequestNew'
import TransactionList from 'routes/Transaction/routes/TransactionList'
import TransactionDetail from 'routes/Transaction/routes/TransactionDetail'
import IndividualReport from './routes/IndividualReport'
import TeamReport from './routes/TeamReport'
import Logging from 'routes/Logging'
import MyLogs from 'routes/MyLogs'

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
      <Route exact path={`${path}/financial-requests`} component={FinancialRequest} />
      <Route path={`${path}/financial-requests/:id/detail`} component={FinancialRequestEdit} />
      <Route path={`${path}/financial-requests/new`} component={FinancialRequestNew} />
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
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
