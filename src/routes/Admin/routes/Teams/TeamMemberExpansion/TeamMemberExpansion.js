import React, { useCallback }from 'react'
import PropTypes from 'prop-types'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import { Chip } from '@material-ui/core'
import { Face as FaceIcon } from '@material-ui/icons'

import useStyles from './style'
import { getTeamMembers, teamMemberSelector } from 'store/modules/teams'
import Spinner from 'components/Spinner'

const TeamMemberExpansion = ({ team_name, team_id, getTeamMembers, teamMembers }) => {
  const classes = useStyles()

  const handleChange = useCallback((event, expanded) => {
    expanded && getTeamMembers(team_id)
  }, [getTeamMembers, team_id])

  const handleDeleteMember = useCallback((email) => () => {
    console.log(email)
  }, [])
  return (
    <ExpansionPanel onChange={handleChange}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>{team_name}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
      {
        !teamMembers ? <Spinner /> : (
          teamMembers.map( member => (
          <Chip
            key={member.email}
            label={member.email}
            color="primary"
            onDelete={handleDeleteMember(member.email)}
            icon={<FaceIcon />}
            variant="outlined"
          />
          ))
        )
      }
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

TeamMemberExpansion.propTypes = {
  team_name: PropTypes.string,
  team_id: PropTypes.number
}

const actions = {
  getTeamMembers
}

const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector
})

export default connect(selectors, actions)(TeamMemberExpansion)