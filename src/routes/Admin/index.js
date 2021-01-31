import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from './routes/Dashboard'
import UserEdit from './routes/UserEdit'
import Users from 'components/Users'
import UserNew from './routes/UserNew'
import Teams from './routes/Teams'
import Profiles from './routes/Profiles'
import ProfileDetail from './routes/Profiles/ProfileEdit'
import Accounts from './routes/Accounts'
import AccountEdit from './routes/Accounts/AccountEdit'
import { isAdminOrRedir } from 'hocs/withRoles'
import Partners from '../Partners'
import PartnerNew from '../Partners/PartnerNew'
import PartnerEdit from '../Partners/PartnerEdit'
import Clients from '../Clients'
import ClientNew from '../Clients/ClientNew'
import ClientEdit from '../Clients/ClientEdit'

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route exact path={`${match.path}/users`} component={Users} />
      <Route path={`${match.path}/users/new`} component={UserNew} />
      <Route path={`${match.path}/users/:id/detail`} component={UserEdit} />
      <Route path={`${match.path}/teams`} component={Teams} />
      <Route exact path={`${match.path}/profiles`} component={Profiles} />
      <Route path={`${match.path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route exact path={`${match.path}/accounts`} component={Accounts} />
      <Route path={`${match.path}/accounts/:id/detail`} component={AccountEdit} />
      <Route exact path={`${match.path}/partners`} component={Partners} />
      <Route path={`${match.path}/partners/create`} component={PartnerNew} />
      <Route path={`${match.path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${match.path}/clients`} component={Clients} />
      <Route path={`${match.path}/clients/create`} component={ClientNew} />
      <Route path={`${match.path}/clients/:id/detail`} component={ClientEdit} />
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
