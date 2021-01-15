import React, { useCallback }from 'react'
import PropTypes from 'prop-types'
import { Grid, Chip } from '@material-ui/core'
import { Face as FaceIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { withRouter } from 'react-router'

const useStyles = makeStyles( theme => ({
  chip: {
    margin: theme.spacing(1) / 2,
  }
}))

const ProfileChips = ({ profiles, history }) => {
  const classes = useStyles()

  const showProfileDetail = useCallback((id) => () => {
    history.push(`/admin/profiles/${id}/detail`)
  }, [history])

  return (
    <Grid
      container
      alignItems='center'
      justify='center'
      wrap='wrap'
    >
    {
      profiles.map(profile => (
        <Chip
          key={profile.id}
          label={`${profile.first_name} ${profile.last_name}`}
          color="primary"
          icon={<FaceIcon />}
          variant="outlined"
          className={classes.chip}
          onClick={showProfileDetail(profile.id)}
        />
      ))
    }
    </Grid>
  )
}

ProfileChips.propTypes = {
  profiles: PropTypes.array
}

export default withRouter(ProfileChips);