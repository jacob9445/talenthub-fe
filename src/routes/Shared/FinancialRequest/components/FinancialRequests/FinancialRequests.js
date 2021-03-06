import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import PropTypes from 'prop-types'
import AllFinancialRequests from '../../routes/AllFinancialRequests'
import PendingFinancialRequests from '../../routes/PendingFinancialRequests'
import ApprovedFinancialRequests from '../../routes/ApprovedFinancialRequests'
import DeclinedFinancialRequests from '../../routes/DeclinedFinancialRequests'
import CanceledFinancialRequests from '../../routes/CanceledFinancialRequests'
import FinancialRequestNew from '../../routes/FinancialRequestNew'
import FinancialRequestEdit from '../../routes/FinancialRequestEdit'
import FinancialRequestDetail from '../../routes/FinancialRequestDetail'

const FinancialRequests = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}/all`} component={AllFinancialRequests} />
      <Route exact path={`${path}/pending`} component={PendingFinancialRequests} />
      <Route exact path={`${path}/approved`} component={ApprovedFinancialRequests} />
      <Route exact path={`${path}/declined`} component={DeclinedFinancialRequests} />
      <Route exact path={`${path}/canceled`} component={CanceledFinancialRequests} />
      <Route exact path={`${path}/new`} component={FinancialRequestNew} />
      <Route exact path={`${path}/:id/detail`} component={FinancialRequestDetail} />
      <Route exact path={`${path}/:id/edit`} component={FinancialRequestEdit} />
      <Redirect to={`${path}/pending`} />
    </Switch>
  )
}

FinancialRequests.propTypes = {
  match: PropTypes.object.isRequired
}

export default FinancialRequests
