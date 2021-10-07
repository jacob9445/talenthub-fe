import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import TransactionReportList from 'routes/Developer/routes/Reports/routes/Transaction/routes/TransactionReportList'
import TransactionReportDetail from 'routes/Shared/TransactionDetail'

const Transaction = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={TransactionReportList} />
    <Route exact path={`${path}/:id/detail`} component={TransactionReportDetail} />
    <Redirect to={`${path}`} />
  </Switch>
)

Transaction.propTypes = {
  match: PropTypes.object.isRequired
}

export default Transaction
