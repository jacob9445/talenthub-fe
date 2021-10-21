import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isAdminOrRedir } from 'hocs/withRoles'
import Spinner from 'components/Spinner'
const Dashboard = lazy(() => import('routes/Shared/Dashboard/routes'))
const User = lazy(() => import('routes/Shared/User'))
const Team = lazy(() => import('./routes/Team'))
const Profile = lazy(() => import('routes/Shared/Profile'))
const Account = lazy(() => import('routes/Shared/Account'))
const Partner = lazy(() => import('routes/Shared/Partner'))
const Client = lazy(() => import('routes/Shared/Client'))
const Project = lazy(() => import('routes/Shared/Project'))
const FinancialRequests = lazy(() => import('routes/Shared/FinancialRequest'))
const Logging = lazy(() => import('routes/Shared/Logging'))
const MyLogs = lazy(() => import('routes/Shared/MyLogs'))
const Settings = lazy(() => import('routes/Shared/Settings'))
const FinancialReports = lazy(() => import('./routes/Reports'))

const Admin = ({ match: { path } }) => {
  return (
    <Suspense fallback={() => <Spinner />}>
      <Switch>
        <Route path={`${path}/accounts`} component={Account} />
        <Route path={`${path}/clients`} component={Client} />
        <Route path={`${path}/dashboard`} component={Dashboard} />
        <Route path={`${path}/financial-requests`} component={FinancialRequests} />
        <Route path={`${path}/partners`} component={Partner} />
        <Route path={`${path}/profiles`} component={Profile} />
        <Route path={`${path}/projects`} component={Project} />
        <Route path={`${path}/users`} component={User} />
        <Route path={`${path}/teams`} component={Team} />
        <Route path={`${path}/logging/:interval?`} component={Logging} />
        <Route path={`${path}/my-logs`} component={MyLogs} />
        <Route path={`${path}/settings`} component={Settings} />
        <Route path={`${path}/financial-reports`} component={FinancialReports} />
      </Switch>
    </Suspense>
  )
}

Admin.propTypes = {
  match: PropTypes.object.isRequired
}

export default isAdminOrRedir(Admin)
