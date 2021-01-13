import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import PropTypes from 'prop-types'

import { getTeams, teamsSelector } from 'store/modules/teams'
import Widget from 'components/Widget'
import Spinner from 'components/Spinner'
import TeamMemberExpansion from './TeamMemberExpansion'

const Teams = ({getTeams, teams }) => {

  useEffect(() => {
    !teams && getTeams()
  }, [teams, getTeams])
  if( !teams) return <Spinner />
  else return (
    <Widget title='Teams' disableWidgetMenu>
    { teams.map( team => (
      <TeamMemberExpansion 
        key={team.id} 
        team_id = {team.id} 
        team_name={team.name}
      />
    ))}
    </Widget>
  )
}

Teams.propTypes = {
  getTeams: PropTypes.func,
  teams: PropTypes.array,
}

const actions = {
  getTeams
}

const selectors = createStructuredSelector({
  teams: teamsSelector
})

export default connect(selectors, actions)(Teams);