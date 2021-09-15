import React from 'react'
import { Redirect, Switch, Route } from 'react-router'
import Project from 'routes/Shared/Project/routes/Project/Project'
import ProjectEdit from 'routes/Shared/Project/routes/ProjectEdit/ProjectEdit'
import ProjectNew from 'routes/Shared/Project/routes/ProjectNew/ProjectNew'

const ProjectRoute = ({ match: { path } }) => (
  <Switch>
    <Route exact path={`${path}`} component={Project} />
    <Route exact path={`${path}/:id/detail`} component={ProjectEdit} />
    <Route exact path={`${path}/new`} component={ProjectNew} />
    <Redirect to={`${path}`} />
  </Switch>
)

export default ProjectRoute
