import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import PartnerList from '../../routes/PartnerList'
import PartnerEdit from '../../routes/PartnerEdit'
import PartnerNew from '../../routes/PartnerNew'

const Partner = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={PartnerList} />
    <Route exact path={`${path}/:id/detail`} component={PartnerEdit} />
    <Route exact path={`${path}/new`} component={PartnerNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Partner.propTypes = {
  match: PropTypes.object.isRequired
}

export default Partner
