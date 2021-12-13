import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'

import PaymentAccountList from '../../routes/PaymentAccountList'
import PaymentAccountEdit from '../../routes/PaymentAccountEdit'
import PaymentAccoutNew from '../../routes/PaymentAccountNew'

const Project = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={PaymentAccountList} />
    <Route exact path={`${path}/:id/detail`} component={PaymentAccountEdit} />
    <Route exact path={`${path}/new`} component={PaymentAccoutNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Project.propTypes = {
  match: PropTypes.object.isRequired
}

export default Project
