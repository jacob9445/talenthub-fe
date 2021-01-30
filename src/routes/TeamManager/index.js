import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import Dashboard from './routes/Dashboard'
import Users from 'components/Users'
import { isTeamManagerOrRedir } from 'hocs/withRoles'
import Partners from '../Partners'
import CreatePartner from '../Partners/CreatePartner'
import PartnerDetail from '../Partners/PartnerDetail'
const TeamManager = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/dashboard`} component={Dashboard} />
      <Route path={`${match.path}/users`} component={Users} />
      <Route exact path={`${match.path}/partners`} component={Partners} />
      <Route path={`${match.path}/partners/create`} component={CreatePartner} />
      <Route path={`${match.path}/partners/:id/detail`} component={PartnerDetail} />
    </Switch>
  )
}

TeamManager.propTypes = {
  match: PropTypes.object.isRequired
}

export default isTeamManagerOrRedir(TeamManager)
