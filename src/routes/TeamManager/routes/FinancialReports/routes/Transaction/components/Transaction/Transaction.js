import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import TransactionReportList from 'routes/TeamManager/routes/FinancialReports/routes/Transaction/routes/TransactionReportList'
import TransactionReportDetail from 'routes/Shared/TransactionReportDetail'

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
