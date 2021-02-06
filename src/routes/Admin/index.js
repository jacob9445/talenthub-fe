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
import Project from '../Project'
import ProjectNew from '../Project/ProjectNew'
import ProjectEdit from '../Project/ProjectEdit'
import FinancialRequest from '../FinancialRequest'
import FinancialRequestEdit from '../FinancialRequest/FinancialRequestEdit'
import FinancialRequestNew from '../FinancialRequest/FinancialRequestNew'

const Admin = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/users`} component={Users} />
      <Route path={`${path}/users/new`} component={UserNew} />
      <Route path={`${path}/users/:id/detail`} component={UserEdit} />
      <Route path={`${path}/teams`} component={Teams} />
      <Route exact path={`${path}/profiles`} component={Profiles} />
      <Route path={`${path}/profiles/:id/detail`} component={ProfileDetail} />
      <Route exact path={`${path}/accounts`} component={Accounts} />
      <Route path={`${path}/accounts/:id/detail`} component={AccountEdit} />
      <Route exact path={`${path}/partners`} component={Partners} />
      <Route path={`${path}/partners/create`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${path}/clients`} component={Clients} />
      <Route path={`${path}/clients/create`} component={ClientNew} />
      <Route path={`${path}/clients/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/project`} component={Project} />
      <Route path={`${path}/project/create`} component={ProjectNew} />
      <Route path={`${path}/project/:id/detail`} component={ProjectEdit} />
      <Route exact path={`${path}/financial-requests`} component={FinancialRequest} />
      <Route path={`${path}/financial-requests/:id/detail`} component={FinancialRequestEdit} />
      <Route path={`${path}/financial-requests/new`} component={FinancialRequestNew} />
    </Switch>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
