import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import ClientEdit from 'routes/Shared/Client/routes/ClientEdit/ClientEdit'
import ClientNew from 'routes/Shared/Client/routes/ClientNew/ClientNew'
import ClientList from 'routes/Shared/Client/routes/ClientList/ClientList'

const Client = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={ClientList} />
      <Route exact path={`${path}/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/new`} component={ClientNew} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

Client.propTypes = {
  match: PropTypes.object.isRequired
}

export default Client
