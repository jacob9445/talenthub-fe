import React, { Suspense, lazy } from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'

const Dashboard = lazy(() => import('routes/Shared/Dashboard/routes'))
const Client = lazy(() => import('routes/Shared/Client'))
const Partner = lazy(() => import('routes/Shared/Partner'))
const Project = lazy(() => import('routes/Shared/Project'))
const FinancialRequests = lazy(() => import('routes/Shared/FinancialRequest'))
const Profile = lazy(() => import('routes/Shared/Profile'))
const Account = lazy(() => import('routes/Shared/Account'))
const MyLogs = lazy(() => import('routes/Shared/MyLogs'))
const Settings = lazy(() => import('routes/Shared/Settings'))
const FinancialReports = lazy(() => import('./routes/Reports'))
const Spinner = lazy(() => import('components/Spinner'))

const Developer = ({ match: { path } }) => {
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
        <Route path={`${path}/my-logs`} component={MyLogs} />
        <Route path={`${path}/settings`} component={Settings} />
        <Route path={`${path}/financial-reports`} component={FinancialReports} />
      </Switch>
    </Suspense>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
