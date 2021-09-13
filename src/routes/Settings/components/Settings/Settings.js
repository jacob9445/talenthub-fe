import React from 'react'
import { Route, Switch } from 'react-router'
import PropTypes from 'prop-types'

import AboutMe from 'routes/Settings/routes/AboutMe/AboutMe'

const Settings = ({ match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/me`} component={AboutMe} />
    </Switch>
  )
}

Settings.propTypes = {
  path: PropTypes.string
}

export default Settings
