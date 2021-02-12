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

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/clients`} component={Client} />
      <Route path={`${path}/clients/create`} component={ClientNew} />
      <Route path={`${path}/clients/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/partners`} component={Partner} />
      <Route path={`${path}/partners/create`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
      <Route exact path={`${path}/projects`} component={Project} />
      <Route path={`${path}/projects/create`} component={ProjectNew} />
      <Route path={`${path}/projects/:id/detail`} component={ProjectEdit} />
      <Route exact path={`${path}/financial-requests`} component={FinancialRequest} />
      <Route path={`${path}/financial-requests/:id/detail`} component={FinancialRequestEdit} />
      <Route path={`${path}/financial-requests/new`} component={FinancialRequestNew} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
