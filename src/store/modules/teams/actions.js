import { createAction } from 'redux-actions'
import * as Types from './types'

export const getTeams = createAction(Types.GET_TEAMS)
export const getTeamMembers = createAction(Types.GET_TEAM_MEMBERS)