import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import Account from '../../routes/Account'
import AccountEdit from '../../routes/AccountEdit'
import AccountNew from '../../routes/AccountNew'

const AccoutRoute = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={Account} />
      <Route exact path={`${path}/:id/detail`} component={AccountEdit} />
      <Route exact path={`${path}/new`} component={AccountNew} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

export default AccoutRoute
