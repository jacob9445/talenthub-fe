import React, { useEffect, useCallback } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Link, withRouter } from 'react-router-dom'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { show } from 'redux-modal'

import Widget from 'components/Widget'
import PlatformTable from '../../components/PlatformTable'
import Spinner from 'components/Spinner'
import {
  getPlatforms,
  deletePlatformAndRefresh,
  platformsSelector,
  platformsLoadingSelector
} from 'store/modules/platform'
import { meSelector } from 'store/modules/auth'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const Platform = ({
  getPlatforms,
  deletePlatformAndRefresh,
  platforms,
  isPlatformLoading,
  me,
  match: { path },
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getPlatforms({
      me: me,
      params: pagination
    })
  }, [getPlatforms, me, pagination])

  const handleDelete = useCallback(
    id => {
      deletePlatformAndRefresh({
        id,
        role: me.role,
        message: 'Are you sure to delete the platform?'
      })
    },
    [me.role, deletePlatformAndRefresh]
  )
  if (isPlatformLoading) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget
            title="Platforms"
            disableWidgetMenu
            WidgetButton={
              <Button color="primary" component={Link} to={`${path}/new`}>
                Add a Platform
              </Button>
            }>
            <PlatformTable
              data={platforms}
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
  getPlatforms,
  deletePlatformAndRefresh,
  show
}

const selectors = createStructuredSelector({
  platforms: platformsSelector,
  isPlatformLoading: platformsLoadingSelector,
  me: meSelector
})

Platform.propTypes = {
  getPlatforms: PropTypes.func.isRequired,
  deletePlatformAndRefresh: PropTypes.func.isRequired,
  platforms: ListDataType,
  isPlatformLoading: PropTypes.bool.isRequired,
  me: PropTypes.object,
  match: PropTypes.object.isRequired,
  pagination: PropTypes.object
}

export default compose(withRouter, withPaginationInfo, connect(selectors, actions))(Platform)
