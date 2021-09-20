import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'

import useStyles from './styles'
import EditableSelect from 'components/EditableSelect'
import { getTeamMembers, teamMemberSelector } from 'store/modules/team'
import { searchUsers, searchedUsersSelector } from 'store/modules/user'
import { meSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'
import { parseQueryString, jsonToQueryString, getFullName } from 'helpers/utils'

const DashboardFilter = ({
  teamId,
  me,
  location,
  history,
  teamMembers,
  getTeamMembers,
  searchUsers,
  users,
  teamOptions
}) => {
  const classes = useStyles()
  const [showAllUsers, setShowAllUsers] = useState(1)
  const queryObj = useMemo(
    () => ({
      ...parseQueryString(location.search)
    }),
    [location.search]
  )

  useEffect(() => {
    const { team, user } = queryObj
    searchUsers({
      team,
      user
    })
  }, [searchUsers, queryObj])

  useEffect(() => {
    if (me.role === ROLES.ADMIN && teamId) getTeamMembers(teamId)
  }, [teamId, getTeamMembers, me.role])

  const handleTeamChange = useCallback(
    value => {
      const team = value
      if (team === 'all' || team === '') {
        setShowAllUsers(1)
        searchUsers()
        history.push({
          search: jsonToQueryString({})
        })
      } else {
        setShowAllUsers(0)
        history.push({
          search: jsonToQueryString({
            team
          })
        })
      }
    },
    [history, searchUsers]
  )

  const handleUserChange = useCallback(
    value => {
      const user = value
      history.push({
        search: jsonToQueryString({
          team: queryObj.team,
          user
        })
      })
    },
    [history, queryObj]
  )

  const handleUserInputChange = useCallback(
    value => {
      const search = value
      history.push({
        search: jsonToQueryString({
          team: queryObj.team,
          search
        })
      })
    },
    [history, queryObj]
  )

  const userOptions = useMemo(
    () =>
      !showAllUsers
        ? teamMembers
          ? teamMembers.map(user => ({
              value: user.id.toString(),
              label: getFullName(user)
            }))
          : [{ label: '', value: '' }]
        : users
        ? users.map(user => ({
            value: user.id.toString(),
            label: user.full_name
          }))
        : [{ label: '', value: '' }],
    [users, teamMembers, showAllUsers]
  )

  return (
    <Grid item xs={12}>
      <Paper>
        <Grid container spacing={2} className={classes.wraper}>
          {[ROLES.ADMIN].includes(me.role) && (
            <Grid item xs={4} className={classes.selectorWrapper}>
              <EditableSelect
                fullWidth
                label="Team"
                options={teamOptions}
                value={queryObj.team}
                onChange={handleTeamChange}
              />
            </Grid>
          )}
          {[ROLES.ADMIN, ROLES.TEAM_MANAGER].includes(me.role) && (
            <Grid item xs={8} className={classes.selectorWrapper}>
              <EditableSelect
                fullWidth
                label="User"
                value={queryObj.user}
                options={userOptions}
                onInputChange={handleUserInputChange}
                onChange={handleUserChange}
              />
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  )
}

const actions = {
  getTeamMembers,
  searchUsers
}

const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector,
  users: searchedUsersSelector,
  me: meSelector
})

DashboardFilter.proptype = {
  teamId: PropTypes.number,
  me: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  teamMembers: PropTypes.array,
  getTeamMembers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
  teamOptions: PropTypes.object
}

export default connect(selectors, actions)(DashboardFilter)
