import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'

import Transaction from 'routes/Admin/routes/Reports/routes/Transaction'
import TeamReportList from 'routes/Admin/routes/Reports/routes/TeamReportList'
import IndividualReportList from 'routes/Admin/routes/Reports/routes/IndividualReportList'

const Reports = ({ match: { path } }) => (
  <Switch>
    <Route path={`${path}/transactions`} component={Transaction} />
    <Route path={`${path}/individuals`} component={IndividualReportList} />
    <Route path={`${path}/teams`} component={TeamReportList} />
    <Redirect to={`${path}/transactions`} />
  </Switch>
)

Reports.propTypes = {
  match: PropTypes.object.isRequired
}

export default Reports
