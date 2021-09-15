import React, { useCallback } from 'react'
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@material-ui/core'
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { show } from 'redux-modal'
import PropTypes from 'prop-types'

import useStyles from './styles'
import Spinner from 'components/Spinner'
import TeamMemberSelect from '../TeamMemberSelect'
import { unassignedUsersSelector, changeUserTeam } from 'store/modules/user'
import { getTeamMembers, teamMemberSelector } from 'store/modules/team'

const TeamMemberExpansion = ({
  teamId,
  teamName,
  getTeamMembers,
  teamMembers,
  onDeleteTeam: handleDeleteTeam,
  unassignedUsers,
  show,
  changeUserTeam
}) => {
  const classes = useStyles()
  const handleChange = useCallback(
    (event, expanded) => {
      expanded && getTeamMembers(teamId)
    },
    [getTeamMembers, teamId]
  )
  const handleDelete = useCallback(
    id => {
      changeUserTeam({
        teamId,
        id,
        status: false,
        data: {
          team: null
        }
      })
    },
    [changeUserTeam, teamId]
  )

  const handleClick = useCallback(
    id => {
      changeUserTeam({
        teamId,
        id,
        status: true,
        data: {
          team: teamId
        }
      })
    },
    [changeUserTeam, teamId]
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

      {!teamMembers ? (
        <Spinner />
      ) : teamMembers.length >= 1 ? (
        <div className={classes.selectWraper}>
          <TeamMemberSelect
            options={unassignedUsers}
            defaultOptions={teamMembers}
            onDelete={handleDelete}
            onClick={handleClick}
          />
        </div>
      ) : (
        <>
          <div className={classes.selectWraper}>
            <TeamMemberSelect
              options={unassignedUsers}
              defaultOptions={teamMembers}
              onDelete={handleDelete}
              onClick={handleClick}
            />
          </div>
          <AccordionDetails>
            <div className={classes.buttonWrapper}>
              <Button color="secondary" variant="contained" onClick={() => handleDeleteTeam(teamId)}>
                Remove
              </Button>
            </div>
          </AccordionDetails>
        </>
      )}
    </Accordion>
  )
}

TeamMemberExpansion.propTypes = {
  teamName: PropTypes.string.isRequired,
  teamId: PropTypes.number.isRequired,
  getTeamMembers: PropTypes.func.isRequired,
  teamMembers: PropTypes.array,
  handleDeleteTeam: PropTypes.func,
  show: PropTypes.func.isRequired,
  changeUserTeam: PropTypes.func.isRequired,
  unassignedUsers: PropTypes.arrayOf(PropTypes.object)
}

const actions = {
  getTeamMembers,
  show,
  changeUserTeam
}

const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector,
  unassignedUsers: unassignedUsersSelector
})

export default connect(selectors, actions)(TeamMemberExpansion)
