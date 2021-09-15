import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from 'routes/Shared/Dashboard'
import Client from 'routes/Shared/Client'
import Partner from 'routes/Shared/Partner'
import Project from 'routes/Shared/Project'
import ProjectNew from 'routes/Shared/Project/ProjectNew'
import ProjectEdit from 'routes/Shared/Project/ProjectEdit'
import FinancialRequests from 'routes/Shared/FinancialRequest'
import Profile from 'routes/Shared/Profile'
import Account from 'routes/Shared/Account'
import MyLogs from 'routes/Shared/MyLogs'
import Settings from 'routes/Shared/Settings'
import TransactionList from 'routes/Shared/Transaction/routes/TransactionList'
import TransactionDetail from 'routes/Shared/Transaction/routes/TransactionDetail'

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/clients`} component={Client} />
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route path={`${path}/financial-requests`} component={FinancialRequests} />
      <Route path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/profiles`} component={Profile} />

      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/new`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />

      <Route path={`${path}/my-logs`} component={MyLogs} />
      <Route path={`${path}/settings`} component={Settings} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
