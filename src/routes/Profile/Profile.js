import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick, path } from 'ramda'
import { show } from 'redux-modal'
import { Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

import Widget from 'components/Widget'
import ProfileTable from './ProfileTable'
import { getProfiles, profileSelector, profileLoadingSelector, deleteProfileAndRefresh } from 'store/modules/profile'
import { meSelector } from 'store/modules/auth'
import Spinner from 'components/Spinner'
import { URL_PREFIXES } from 'config/constants'

const Profile = ({ getProfiles, profiles, me, isLoading, deleteProfileAndRefresh, show }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles])

  const data = useMemo(() => {
    if (profiles) {
      return profiles.map(profile => ({
        ...pick(['id', 'profile_type', 'first_name', 'last_name', 'address', 'country', 'dob', 'gender'])(profile),
        username: path(['user', 'username'])(profile)
      }))
    }
  }, [profiles])

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
            <ProfileTable data={data} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

Profile.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteProfileAndRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profiles: PropTypes.array,
  me: PropTypes.object,
  show: PropTypes.func.isRequired
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

export default connect(
  selectors,
  actions
)(Profile)
