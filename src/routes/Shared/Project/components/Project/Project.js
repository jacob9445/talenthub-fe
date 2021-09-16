import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import PropTypes from 'prop-types'
import ProjectList from '../../routes/ProjectList'
import ProjectEdit from '../../routes/ProjectEdit'
import ProjectNew from '../../routes/ProjectNew'

const Project = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={ProjectList} />
    <Route exact path={`${path}/:id/detail`} component={ProjectEdit} />
    <Route exact path={`${path}/new`} component={ProjectNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

Project.propTypes = {
  match: PropTypes.object.isRequired
}

export default Project
