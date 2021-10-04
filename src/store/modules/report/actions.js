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

//for download
export const downloadDevelopersEarning = createAction(Types.DOWNLOAD_DEVELOPERS_EARNING)
export const downloadIndividualDeveloperEarning = createAction(Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_EARNING)
export const downloadIndividualDeveloperProjectsEarning = createAction(
  Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_PROJECTS_EARNING
)
export const downloadTeamsEarning = createAction(Types.DOWNLOAD_TEAMS_EARNING)
export const downloadSelectedTeamEarning = createAction(Types.DOWNLOAD_SELECTED_TEAM_EARNING)

export const downloadMyReport = createAction(Types.DOWNLOAD_MY_REPORT)
