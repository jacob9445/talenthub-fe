import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from 'routes/Shared/Dashboard'
import Client from 'routes/Shared/Client'
import Partner from 'routes/Shared/Partner'
import Project from 'routes/Shared/Project'
import FinancialRequests from 'routes/Shared/FinancialRequest'
import Profile from 'routes/Shared/Profile'
import Account from 'routes/Shared/Account'
import MyLogs from 'routes/Shared/MyLogs'
import Settings from 'routes/Shared/Settings'
import FinancialReports from './routes/Reports'

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/clients`} component={Client} />
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/financial-requests`} component={FinancialRequests} />
      <Route path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/projects`} component={Project} />
      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />
      <Route path={`${path}/financial-reports`} component={FinancialReports} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
