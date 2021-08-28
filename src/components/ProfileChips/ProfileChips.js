import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { Face as FaceIcon, Add } from '@material-ui/icons'
import { withRouter } from 'react-router'

import { URL_PREFIXES } from 'config/constants'
import BlockChip from 'components/BlockChip'

const ProfileChips = props => {
  const { profiles, history, location, me } = props

  const showProfileDetail = useCallback(
    id => () => {
      history.push(`/admin/profiles/${id}/detail`, location.pathname)
    },
    [history, location]
  )
  const showProfileNew = useCallback(() => {
    history.push(`/${URL_PREFIXES[me.role]}/profiles/new`)
  }, [history, me])

  return (
    <Grid container alignItems="center" justify="center" wrap="wrap">
      {profiles.map(profile => (
        <BlockChip
          key={profile.id}
          label={`${profile.first_name} ${profile.last_name}`}
          color="primary"
          icon={<FaceIcon />}
          variant="outlined"
          onClick={showProfileDetail(profile.id)}
        />
      ))}
      <BlockChip
        label={profiles.length === 0 ? 'Add a profile' : 'Add another profile'}
        color="primary"
        onClick={showProfileNew}
        icon={<Add />}
      />
    </Grid>
  )
}

ProfileChips.propTypes = {
  profiles: PropTypes.array
}

export default withRouter(ProfileChips)
