import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import TeamReportList from 'routes/Admin/routes/Reports/routes/TeamReportList'
import IndividualReportList from 'routes/Admin/routes/Reports/routes/IndividualReportList'

const Reports = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}/teams`} component={TeamReportList} />
    <Route exact path={`${path}/individuals`} component={IndividualReportList} />
    <Redirect to={`${path}/transactions`} />
  </Switch>
)

Reports.propTypes = {
  match: PropTypes.object.isRequired
}

export default Reports
