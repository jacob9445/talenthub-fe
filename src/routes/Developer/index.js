import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from './routes/Dashboard'
import Clients from './routes/Clients'
import CreateClient from './routes/Clients/CreateClient'
import ClientDetail from './routes/Clients/ClientDetail'
import Partners from '../Partners'
import CreatePartner from '../Partners/CreatePartner'
import PartnerDetail from '../Partners/PartnerDetail'

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/clients`} component={Clients} />
      <Route path={`${path}/clients/create`} component={CreateClient} />
      <Route path={`${path}/clients/:id/detail`} component={ClientDetail} />
      <Route exact path={`${path}/partners`} component={Partners} />
      <Route path={`${path}/partners/create`} component={CreatePartner} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerDetail} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
