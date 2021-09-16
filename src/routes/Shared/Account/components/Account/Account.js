import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import AccountList from '../../routes/AccountList'
import AccountEdit from '../../routes/AccountEdit'
import AccountNew from '../../routes/AccountNew'

const Account = ({ match: { path } }) => {
  return (
    <Switch>
      <Route exact path={`${path}`} component={AccountList} />
      <Route exact path={`${path}/:id/detail`} component={AccountEdit} />
      <Route exact path={`${path}/new`} component={AccountNew} />
      <Redirect to={`${path}`} />
    </Switch>
  )
}

Account.propTypes = {
  match: PropTypes.object.isRequired
}

export default Account
