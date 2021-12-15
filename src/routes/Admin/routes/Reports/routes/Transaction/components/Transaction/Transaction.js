import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import TransactionList from 'routes/Admin/routes/Reports/routes/Transaction/routes/TransactionList'
import TransactionNew from 'routes/Admin/routes/Reports/routes/Transaction/routes/TransactionNew'
import TransactionDetail from 'routes/Shared/TransactionDetail'
import TransactionEdit from '../../routes/TransactionEdit'

const Transaction = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={TransactionList} />
    <Route exact path={`${path}/:id/detail`} component={TransactionDetail} />
    <Route exact path={`${path}/:id/Edit`} component={TransactionEdit} />
    <Route exact path={`${path}/new`} component={TransactionNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Transaction.propTypes = {
  match: PropTypes.object.isRequired
}

export default Transaction
