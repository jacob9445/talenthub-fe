import React from 'react'
import { Route, Switch } from 'react-router'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from './routes/Dashboard'
import Clients from './routes/Clients'
import CreateClient from './routes/Clients/CreateClient'

const Developer = ({match:{path}}) => {
  return (
    <Switch>
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route exact path={`${path}/clients`} component={Clients} />
        <Route path={`${path}/clients/create`} component={CreateClient} />
    </Switch>
  )
}

export default isDeveloperOrRedir(Developer)