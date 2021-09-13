import { createAction } from 'redux-actions'
import * as Types from './types'

export const getTeams = createAction(Types.GET_TEAMS)
export const getTeamMembers = createAction(Types.GET_TEAM_MEMBERS)
export const createTeam = createAction(Types.CREATE_TEAM)
export const deleteTeam = createAction(Types.DELETE_TEAM)
export const updateTeam = createAction(Types.UPDATE_TEAM)
export const getTeamDetail = createAction(Types.GET_TEAM_DETAIL)
export const createTeamAndRefresh = createAction(Types.CREATE_TEAM_AND_REFRESH)
export const updateTeamAndRefresh = createAction(Types.UPDATE_TEAM_AND_REFRESH)
export const deleteTeamAndRefresh = createAction(Types.DELETE_TEAM_AND_REFRESH)
