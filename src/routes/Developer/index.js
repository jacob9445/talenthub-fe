import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import { isDeveloperOrRedir } from 'hocs/withRoles'
import Dashboard from './routes/Dashboard'
import Clients from '../Clients'
import ClientNew from '../Clients/ClientNew'
import ClientEdit from '../Clients/ClientEdit'
import Partners from '../Partners'
import PartnerNew from '../Partners/PartnerNew'
import PartnerEdit from '../Partners/PartnerEdit'

const Developer = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/dashboard`} component={Dashboard} />
      <Route exact path={`${path}/clients`} component={Clients} />
      <Route path={`${path}/clients/create`} component={ClientNew} />
      <Route path={`${path}/clients/:id/detail`} component={ClientEdit} />
      <Route exact path={`${path}/partners`} component={Partners} />
      <Route path={`${path}/partners/create`} component={PartnerNew} />
      <Route path={`${path}/partners/:id/detail`} component={PartnerEdit} />
    </Switch>
  )
}

Developer.propTypes = {
  match: PropTypes.object
}

export default isDeveloperOrRedir(Developer)
