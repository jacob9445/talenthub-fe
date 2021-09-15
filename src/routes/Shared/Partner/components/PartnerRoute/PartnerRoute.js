import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import Partner from 'routes/Shared/Partner/routes/Partner/Partner'
import PartnerEdit from 'routes/Shared/Partner/routes/PartnerEdit/PartnerEdit'
import PartnerNew from 'routes/Shared/Partner/routes/PartnerNew/PartnerNew'

const PartnerRoute = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={Partner} />
    <Route exact path={`${path}/:id/detail`} component={PartnerEdit} />
    <Route exact path={`${path}/new`} component={PartnerNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default PartnerRoute
