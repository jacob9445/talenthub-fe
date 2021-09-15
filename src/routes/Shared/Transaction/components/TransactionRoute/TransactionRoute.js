import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import TransactionList from 'routes/Shared/Transaction/routes/TransactionList/TransactionList'
import TransactionDetail from 'routes/Shared/Transaction/routes/TransactionDetail/TransactionDetail'

const TransactionRoute = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={TransactionList} />
    <Route exact path={`${path}/:id/detail`} component={TransactionDetail} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default TransactionRoute
