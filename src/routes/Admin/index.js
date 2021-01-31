import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from './routes/Dashboard'
import UserDetail from './routes/UserDetail'
import Users from 'components/Users'
import CreateUser from './routes/CreateUser'
import Teams from './routes/Teams'
import Profiles from './routes/Profiles'
import ProfileDetail from './routes/Profiles/ProfileDetail'
import Accounts from './routes/Accounts'
import AccountDetail from './routes/Accounts/AccountDetail'
import { isAdminOrRedir } from 'hocs/withRoles'
import Partners from '../Partners'
import CreatePartner from '../Partners/CreatePartner'
import PartnerDetail from '../Partners/PartnerDetail'
import Clients from '../Clients'
import CreateClient from '../Clients/CreateClient'
import ClientDetail from '../Clients/ClientDetail'

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route exact path={`${match.path}/users`} component={Users} />
      <Route path={`${match.path}/users/new`} component={CreateUser} />
      <Route path={`${match.path}/users/:id/detail`} component={UserDetail} />
      <Route path={`${match.path}/teams`} component={Teams} />
      <Route exact path={`${match.path}/profiles`} component={Profiles} />
      <Route path={`${match.path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route exact path={`${match.path}/accounts`} component={Accounts} />
      <Route path={`${match.path}/accounts/:id/detail`} component={AccountDetail} />
      <Route exact path={`${match.path}/partners`} component={Partners} />
      <Route path={`${match.path}/partners/create`} component={CreatePartner} />
      <Route path={`${match.path}/partners/:id/detail`} component={PartnerDetail} />
      <Route exact path={`${match.path}/clients`} component={Clients} />
      <Route path={`${match.path}/clients/create`} component={CreateClient} />
      <Route path={`${match.path}/clients/:id/detail`} component={ClientDetail} />
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
