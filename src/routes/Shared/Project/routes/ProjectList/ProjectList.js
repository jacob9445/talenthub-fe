import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import ProjectsTable from '../../components/ProjectTable'
import Spinner from 'components/Spinner'
import { getProjects, deleteProjectAndRefresh, projectsSelector, projectsLoadingSelector } from 'store/modules/project'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const ProjectList = ({
  getProjects,
  deleteProjectAndRefresh,
  projects,
  isProjectsLoading,
  me,
  match: { path },
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getProjects({
      me: me,
      params: pagination
    })
  }, [getProjects, me, pagination])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the project?',
        proceed: () => {
          deleteProjectAndRefresh({ id, role: me.role })
        }
      })
    },
    [show, deleteProjectAndRefresh, me.role]
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
              <Button color="primary" component={Link} to={`${path}/new`}>
                Add Project
              </Button>
            }>
            <ProjectsTable
              data={projects}
              role={me.role}
              onDelete={handleDelete}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    )
}

const actions = {
  getProjects,
  deleteProjectAndRefresh,
  show
}

const selectors = createStructuredSelector({
  projects: projectsSelector,
  isProjectsLoading: projectsLoadingSelector,
  me: meSelector
})

ProjectList.propTypes = {
  getProjects: PropTypes.func.isRequired,
  deleteProjectAndRefresh: PropTypes.func.isRequired,
  projects: ListDataType,
  isProjectsLoading: PropTypes.bool.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired,
  pagination: PropTypes.object
}

export default compose(withRouter, withPaginationInfo, connect(selectors, actions))(ProjectList)
