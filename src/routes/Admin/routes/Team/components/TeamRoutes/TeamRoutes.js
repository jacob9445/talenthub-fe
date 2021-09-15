import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import Team from '../../routes/Team'
import TeamNew from '../../routes/TeamNew'
import TeamEdit from '../../routes/TeamEdit'

const TeamRoutes = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={Team} />
      <Route exact path={`${path}/new`} component={TeamNew} />
      <Route exact path={`${path}/:id/edit`} component={TeamEdit} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

TeamRoutes.propTypes = {
  match: PropTypes.object.isRequired
}

export default TeamRoutes
