import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import Client from 'routes/Shared/Client/routes/Client/Client'
import ClientEdit from 'routes/Shared/Client/routes/ClientEdit/ClientEdit'
import ClientNew from 'routes/Shared/Client/routes/ClientNew/ClientNew'

const ClientRoute = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={Client} />
      <Route exact path={`${path}/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/new`} component={ClientNew} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

export default ClientRoute
