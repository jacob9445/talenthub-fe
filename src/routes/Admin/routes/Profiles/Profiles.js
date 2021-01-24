import React, { useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { pick, path } from 'ramda'
import { Grid } from '@material-ui/core'

import Widget from 'components/Widget'
import ProfileTable from './ProfilesTable'
import { getProfiles, profileSelector, profileLoadingSelector, deleteProfileAndRefresh } from 'store/modules/profiles'
import { meSelector } from 'store/modules/auth'
import Spinner from 'components/Spinner'

const Profiles = ({ getProfiles, profiles, me, isLoading, deleteProfileAndRefresh }) => {
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
      deleteProfileAndRefresh(id)
    },
    [deleteProfileAndRefresh]
  )

  if (isLoading) return <Spinner />
  else
    return (
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Widget title="Profiles" disableWidgetMenu noBodyPadding>
            <ProfileTable data={data} myRole={me.role} handleDelete={handleDelete} />
          </Widget>
        </Grid>
      </Grid>
    )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteProfileAndRefresh: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  profiles: PropTypes.array,
  me: PropTypes.object
}

const actions = {
  getProfiles,
  deleteProfileAndRefresh
}

const selectors = createStructuredSelector({
  profiles: profileSelector,
  isLoading: profileLoadingSelector,
  me: meSelector
})

export default connect(
  selectors,
  actions
)(Profiles)
