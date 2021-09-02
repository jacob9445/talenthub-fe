import React, { useEffect, useCallback } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { show } from 'redux-modal'
import PropTypes from 'prop-types'

import { getProfiles, profileSelector, profileLoadingSelector, deleteProfileAndRefresh } from 'store/modules/profile'
import { meSelector } from 'store/modules/auth'
import { URL_PREFIXES } from 'config/constants'
import ProfileTable from './ProfileTable'
import Spinner from 'components/Spinner'
import Widget from 'components/Widget'
import withPaginationInfo from 'hocs/withPaginationInfo'
import { ListDataType } from 'helpers/prop-types'

const Profile = ({
  getProfiles,
  profiles,
  me,
  isLoading,
  deleteProfileAndRefresh,
  show,
  pagination,
  onChangePage,
  onChangeRowsPerPage
}) => {
  useEffect(() => {
    getProfiles({
      params: pagination
    })
  }, [getProfiles, pagination])

  const handleDelete = useCallback(
    id => {
      show('confirmModal', {
        confirmation: 'Are you sure to delete the profile?',
        proceed: () => {
          deleteProfileAndRefresh(id)
        }
      })
    },
    [show, deleteProfileAndRefresh]
  )

  if (isLoading) return <Spinner />
  else
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget
            title="Profiles"
            disableWidgetMenu
            noBodyPadding
            WidgetButton={
              <Button color="primary" component={Link} to={`/${URL_PREFIXES[me.role]}/profiles/new`}>
                Add Profile
              </Button>
            }>
            <ProfileTable
              data={profiles}
              myRole={me.role}
              handleDelete={handleDelete}
              pagination={pagination}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </Widget>
        </Grid>
      </Grid>
    )
}

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteProfileAndRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profiles: ListDataType,
  me: PropTypes.object,
  show: PropTypes.func.isRequired,
  pagination: PropTypes.object
}

const actions = {
  getProfiles,
  deleteProfileAndRefresh,
  show
}

const selectors = createStructuredSelector({
  profiles: profileSelector,
  isLoading: profileLoadingSelector,
  me: meSelector
})

export default compose(withPaginationInfo, connect(selectors, actions))(Profile)
