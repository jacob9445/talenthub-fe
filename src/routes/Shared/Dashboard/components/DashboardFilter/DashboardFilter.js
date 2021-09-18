import React, { useEffect, useCallback, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Grid, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'

import useStyles from './styles'
import EditableSelect from 'components/EditableSelect'
import { getTeamMembers, teamMemberSelector } from 'store/modules/team'
import { getUsers, usersSelector } from 'store/modules/user'
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
  getUsers,
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
    getUsers({
      role: me.role
    })
  }, [me.role, getUsers])

  useEffect(() => {
    if (me.role === ROLES.ADMIN && teamId) getTeamMembers(teamId)
  }, [teamId, getTeamMembers, me.role])

  const handleTeamChange = useCallback(
    value => {
      const team = value
      if (team === 'all') {
        setShowAllUsers(1)
        getUsers({
          role: me.role
        })
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
    [history, getUsers, me.role]
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
        ? users.results.map(user => ({
            value: user.id.toString(),
            label: getFullName(user)
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
  getUsers
}

const selectors = createStructuredSelector({
  teamMembers: teamMemberSelector,
  users: usersSelector,
  me: meSelector
})

DashboardFilter.proptype = {
  teamId: PropTypes.number,
  me: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  teamMembers: PropTypes.array,
  getTeamMembers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.object,
  teamOptions: PropTypes.object
}

export default connect(selectors, actions)(DashboardFilter)
