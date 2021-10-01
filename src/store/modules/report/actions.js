import { createAction } from 'redux-actions'
import * as Types from './types'

//for only admins
export const getTeamsEarningReport = createAction(Types.GET_TEAMS_EARNING_REPORT)
export const getSelectedTeamEarningReport = createAction(Types.GET_SELECTED_TEAM_EARNING_REPORT)
//for both admins and team-managers
export const getTotalEarningReport = createAction(Types.GET_TOTAL_EARNING_REPORT)
export const getDevelopersEarningReport = createAction(Types.GET_DEVELOPERS_EARNING_REPORT)
export const getIndividualDeveloperEarningReport = createAction(Types.GET_INDIVIDUAL_DEVELOPER_EARNING_REPORT)
export const getIndividualDeveloperProjectEarningReport = createAction(
  Types.GET_INDIVIDUAL_DEVELOPER_PROJECT_EARNING_REPORT
)
//for only developers
export const getSelfEarningReport = createAction(Types.GET_SELF_EARNING_REPORT)
export const getSelfProjectEarningRepot = createAction(Types.GET_SELF_PROJECT_EARNING_REPORT)
