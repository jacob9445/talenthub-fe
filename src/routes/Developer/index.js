import React from 'react'
import { Route, Switch } from 'react-router'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from './routes/Dashboard'
import Clients from './routes/Clients'

const Developer = ({match:{path}}) => {
  return (
    <Switch>
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/clients`} component={Clients} />
    </Switch>
  )
}

export default isDeveloperOrRedir(Developer)