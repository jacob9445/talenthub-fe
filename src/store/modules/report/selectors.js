import { createDataSelector, isRequestPending } from '../api'

//for only admins
export const teamsEarningSelector = createDataSelector('teamsEarning')
export const teamsEarningLoadingSelector = state => isRequestPending('teamsEarning', 'GET')(state)

export const selectedTeamEarningSelector = createDataSelector('selectedTeamEarning')
export const selectedTeamEarningLoadingSelector = state => isRequestPending('selectedTeamEarning', 'GET')(state)

//for both admins and team-managers
export const totalEarningSelector = createDataSelector('totalEarning')
export const totalEarningLoadingSelector = state => isRequestPending('totalEarning', 'GET')(state)

export const developersEarningSelector = createDataSelector('developersEarning')
export const developersEarningLoadingSelector = state => isRequestPending('developersEarning', 'GET')(state)

export const individualDeveloperEarningSelector = createDataSelector('individualDeveloperEarning')
export const individualDeveloperEarningLoadingSelector = state =>
  isRequestPending('individualDeveloperEarning', 'GET')(state)

export const individualDeveloperProjectEarningSelector = createDataSelector('individualDeveloperProjectEarning')
export const individualDeveloperProjectEarningLoadingSelector = state =>
  isRequestPending('individualDeveloperProjectEarning', 'GET')(state)

//for only developers
export const selfFinancialReportSelector = createDataSelector('selfFinancialReport')
export const selfFinancialReportLoadingSelector = state => isRequestPending('selfFinancialReport', 'GET')(state)
