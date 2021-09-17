import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'

import Transaction from 'routes/Shared/Transaction'
import MyReportList from '../../routes/MyReportList'

const Reports = ({ match: { path } }) => (
  <Switch>
    <Route path={`${path}/transactions`} component={Transaction} />
    <Route path={`${path}/my-reports`} component={MyReportList} />
    <Redirect to={`${path}/transactions`} />
  </Switch>
)

Reports.propTypes = {
  match: PropTypes.object.isRequired
}

export default Reports
