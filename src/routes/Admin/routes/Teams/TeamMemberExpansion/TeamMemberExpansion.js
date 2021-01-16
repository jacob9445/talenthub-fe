import React, { useCallback }from 'react'
import PropTypes from 'prop-types'
import { Accordion, AccordionSummary, AccordionDetails, Chip, Typography} from '@material-ui/core'
import { AccountCircle as FaceIcon, ExpandMore as ExpandMoreIcon} from '@material-ui/icons'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as R from 'ramda'

import useStyles from './style'
import Spinner from 'components/Spinner'
import { getTeamMembers } from 'store/modules/teams'
import { dataSelector } from 'store/modules/api'

const TeamMemberExpansion = ({ teamId, teamName, getTeamMembers, teamMembers, history, location}) => {
  const classes = useStyles()

  const handleChange = useCallback((event, expanded) => {
    expanded && getTeamMembers(teamId)
  }, [getTeamMembers, teamId])

  const handleDeleteMember = useCallback((email) => () => {
    console.log(email)
  }, [])

  const showUserDetail = useCallback((id) => () => {
    history.push(`/admin/users/${id}/detail`, location.pathname)
  },[history, location])

  return (
    <Accordion onChange={handleChange}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.heading}>{teamName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
      {
        !teamMembers ? <Spinner /> : (
          teamMembers.map( member => (
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
        )
      }
      </AccordionDetails>
    </Accordion>
  );
};

TeamMemberExpansion.propTypes = {
  teamName: PropTypes.string,
  teamId: PropTypes.number,
  getTeamMembers: PropTypes.func,
  teamMembers: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object
}

const actions = {
  getTeamMembers
}

const teamMemberSelector = (state, props) => R.compose(
  R.path(['results']),
  dataSelector(`teamMembers_${props.teamId}`)
)(state)


const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector
})

export default R.compose(
  connect(selectors, actions),
  withRouter
)(TeamMemberExpansion)