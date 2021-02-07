import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import Widget from 'components/Widget'
import ProjectsTable from './ProjectTable'
import Spinner from 'components/Spinner'
import { getProjects, deleteProjectAndRefresh, projectsSelector, projectsLoadingSelector } from 'store/modules/project'
import { meSelector } from 'store/modules/auth'

const Project = ({ getProjects, deleteProjectAndRefresh, projects, isProjectsLoading, me, match: { path } }) => {
  useEffect(() => {
    getProjects(me)
  }, [getProjects, me])

  const handleDelete = useCallback(
    id => {
      deleteProjectAndRefresh({ id, role: me.role })
    },
    [deleteProjectAndRefresh, me.role]
  )

  if (isProjectsLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Projects"
            disableWidgetMenu
            WidgetButton={
              <Button color="primary" component={Link} to={`${path}/create`}>
                Add Project
              </Button>
            }>
            <ProjectsTable data={projects} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getProjects,
  deleteProjectAndRefresh
}

const selectors = createStructuredSelector({
  projects: projectsSelector,
  isProjectsLoading: projectsLoadingSelector,
  me: meSelector
})

Project.propTypes = {
  getProjects: PropTypes.func.isRequired,
  deleteProjectAndRefresh: PropTypes.func.isRequired,
  projects: PropTypes.array,
  isProjectsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired
}

export default compose(
  withRouter,
  connect(
    selectors,
    actions
  )
)(Project)
