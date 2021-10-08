import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import TransactionList from 'routes/TeamManager/routes/FinancialReports/routes/Transaction/routes/TransactionList'
import TransactionDetail from 'routes/Shared/TransactionDetail'

const Transaction = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={TransactionList} />
    <Route exact path={`${path}/:id/detail`} component={TransactionDetail} />
    <Redirect to={`${path}`} />
  </Switch>
)

Transaction.propTypes = {
  match: PropTypes.object.isRequired
}

export default Transaction
