import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from './routes/Dashboard'
import Users from 'components/Users'
import { isTeamManagerOrRedir } from 'hocs/withRoles'
import Partners from '../Partners'
import PartnerNew from '../Partners/PartnerNew'
import PartnerEdit from '../Partners/PartnerEdit'
import Clients from '../Clients'
import ClientNew from '../Clients/ClientNew'
import ClientEdit from '../Clients/ClientEdit'

const TeamManager = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route path={`${match.path}/users`} component={Users} />
      <Route exact path={`${match.path}/partners`} component={Partners} />
      <Route path={`${match.path}/partners/create`} component={PartnerNew} />
      <Route path={`${match.path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${match.path}/clients`} component={Clients} />
      <Route path={`${match.path}/clients/create`} component={ClientNew} />
      <Route path={`${match.path}/clients/:id/detail`} component={ClientEdit} />
    </Switch>
  )
}

TeamManager.propTypes = {
  match: PropTypes.object.isRequired
}

export default isTeamManagerOrRedir(TeamManager)
