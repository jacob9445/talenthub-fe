import React, { useEffect, useCallback } from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Accordion, AccordionSummary, AccordionDetails, Chip, Typography } from '@material-ui/core'
import { AccountCircle as FaceIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'

import useStyles from './styles'
import Spinner from 'components/Spinner'
import { getTeamUnassigendUsers, unassignedUsersSelector } from 'store/modules/user'

const TeamUnassignedUsers = ({ unassignedUsers, getTeamUnassigendUsers, history, location }) => {
  const classes = useStyles()
  useEffect(() => getTeamUnassigendUsers(), [getTeamUnassigendUsers])

  const showUserDetail = useCallback(
    id => () => {
      history.push(`/admin/users/${id}/detail`, location.pathname)
    },
    [history, location]
  )

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>UNASSIGNED DEVELOPERS</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ flexWrap: 'wrap' }}>
        {!unassignedUsers ? (
          <Spinner />
        ) : unassignedUsers.length >= 1 ? (
          unassignedUsers.map(member => (
            <Chip
              key={member.id}
              label={member.email}
              color="default"
              onClick={showUserDetail(member.id)}
              icon={<FaceIcon />}
              variant="outlined"
              className={classes.chip}
            />
          ))
        ) : (
          <Typography className={classes.noValueMessage}>No unassigned developers</Typography>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

const actions = {
  getTeamUnassigendUsers
}

const selectors = createStructuredSelector({
  unassignedUsers: unassignedUsersSelector
})

TeamUnassignedUsers.propTypes = {
  unassignedUsers: PropTypes.arrayOf(PropTypes.object),
  getTeamUnassigendUsers: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default connect(selectors, actions)(withRouter(TeamUnassignedUsers))
