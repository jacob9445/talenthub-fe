import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'

import { getTeams, teamsSelector } from 'store/modules/teams'

import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import TeamMemberExpansion from './TeamMemberExpansion'

const Teams = ({ getTeams, teams }) => {
  useEffect(() => {
    !teams && getTeams()
  }, [teams, getTeams])

  if (!teams) return <Spinner />
  else
    return (
      <Grid container>
        <Grid item xs={12}>
          <Widget title="Teams" disableWidgetMenu>
            {teams.map(team => (
              <TeamMemberExpansion key={team.id} teamId={team.id} teamName={team.name} />
            ))}
          </Widget>
        </Grid>
      </Grid>
    )
}

Teams.propTypes = {
  getTeams: PropTypes.func,
  teams: PropTypes.array
}

const actions = {
  getTeams
}

const selectors = createStructuredSelector({
  teams: teamsSelector
})

export default connect(
  selectors,
  actions
)(Teams)
