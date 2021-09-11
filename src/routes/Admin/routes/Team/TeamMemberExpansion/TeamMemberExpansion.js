import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails, Chip, Typography, Button } from '@material-ui/core'
import { AccountCircle as FaceIcon, ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import * as R from 'ramda'

import useStyles from './styles'
import Spinner from 'components/Spinner'
import { getTeamMembers } from 'store/modules/team'
import { createDataSelector } from 'store/modules/api'

const TeamMemberExpansion = ({
  teamId,
  teamName,
  getTeamMembers,
  teamMembers,
  history,
  location,
  onDeleteTeam: handleDeleteTeam
}) => {
  const classes = useStyles()
  const handleChange = useCallback(
    (event, expanded) => {
      expanded && getTeamMembers(teamId)
    },
    [getTeamMembers, teamId]
  )

  const handleDeleteMember = useCallback(
    email => () => {
      console.log(email)
    },
    []
  )

  const showUserDetail = useCallback(
    id => () => {
      history.push(`/admin/users/${id}/detail`, location.pathname)
    },
    [history, location]
  )

  return (
    <Accordion onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>
          <Button component={Link} to={`/admin/teams/${teamId}/edit`}>
            {teamName}
          </Button>
        </Typography>
      </AccordionSummary>
      <AccordionDetails style={{ 'flex-wrap': 'wrap' }}>
        {!teamMembers ? (
          <Spinner />
        ) : teamMembers.length >= 1 ? (
          teamMembers.map(member => (
            <Chip
              key={member.email}
              label={member.email}
              color="primary"
              onDelete={handleDeleteMember(member.email)}
              onClick={showUserDetail(member.id)}
              icon={<FaceIcon />}
              variant="outlined"
              className={classes.chip}
            />
          ))
        ) : (
          <div className={classes.buttonWrapper}>
            <Button color="secondary" variant="contained" onClick={() => handleDeleteTeam(teamId)}>
              Remove
            </Button>
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

TeamMemberExpansion.propTypes = {
  teamName: PropTypes.string.isRequired,
  teamId: PropTypes.number.isRequired,
  getTeamMembers: PropTypes.func.isRequired,
  teamMembers: PropTypes.array,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  handleDeleteTeam: PropTypes.func.isRequired
}

const actions = {
  getTeamMembers
}

const teamMemberSelector = (state, props) =>
  R.compose(R.path(['results']), createDataSelector(`teamMembers_${props.teamId}`))(state)

const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector
})

export default R.compose(connect(selectors, actions), withRouter)(TeamMemberExpansion)
