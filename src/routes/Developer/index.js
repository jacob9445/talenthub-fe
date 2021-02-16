import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from 'routes/Dashboard'
import Client from '../Client'
import ClientNew from '../Client/ClientNew'
import ClientEdit from '../Client/ClientEdit'
import Partner from '../Partner'
import PartnerNew from '../Partner/PartnerNew'
import PartnerEdit from '../Partner/PartnerEdit'
import Project from '../Project'
import ProjectNew from '../Project/ProjectNew'
import ProjectEdit from '../Project/ProjectEdit'
import FinancialRequest from '../FinancialRequest'
import FinancialRequestEdit from '../FinancialRequest/FinancialRequestEdit'
import FinancialRequestNew from '../FinancialRequest/FinancialRequestNew'
import TransactionList from '../Transaction/routes/TransactionList'
import TransactionDetail from '../Transaction/routes/TransactionDetail'
import Profile from 'routes/Profile'
import ProfileDetail from 'routes/Profile/ProfileEdit'
import Account from '../Account'
import AccountEdit from '../Account/AccountEdit'

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/clients`} component={Client} />
      <Route path={`${path}/clients/new`} component={ClientNew} />
      <Route path={`${path}/clients/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/partners/new`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/new`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route exact path={`${path}/financial-requests`} component={FinancialRequest} />
      <Route path={`${path}/financial-requests/:id/detail`} component={FinancialRequestEdit} />
      <Route path={`${path}/financial-requests/new`} component={FinancialRequestNew} />
      <Route exact path={`${path}/transactions`} component={TransactionList} />
      <Route path={`${path}/transactions/:id/detail`} component={TransactionDetail} />
      <Route exact path={`${path}/accounts`} component={Account} />
      <Route path={`${path}/accounts/:id/detail`} component={AccountEdit} />
      <Route exact path={`${path}/profiles`} component={Profile} />
      <Route path={`${path}/profiles/:id/detail`} component={ProfileDetail} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
