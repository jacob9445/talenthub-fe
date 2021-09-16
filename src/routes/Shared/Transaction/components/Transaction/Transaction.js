import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import TransactionReportList from 'routes/Shared/Transaction/routes/TransactionReportList/TransactionReportList'
import TransactionReportDetail from 'routes/Shared/Transaction/routes/TransactionReportDetail/TransactionReportDetail'

const Transaction = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={TransactionReportList} />
    <Route exact path={`${path}/:id/detail`} component={TransactionReportDetail} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default Transaction
