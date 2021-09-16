import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import TeamList from '../../routes/TeamList'
import TeamNew from '../../routes/TeamNew'
import TeamEdit from '../../routes/TeamEdit'

const Team = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={TeamList} />
      <Route exact path={`${path}/new`} component={TeamNew} />
      <Route exact path={`${path}/:id/edit`} component={TeamEdit} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

Team.propTypes = {
  match: PropTypes.object.isRequired
}

export default Team
