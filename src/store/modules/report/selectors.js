import { createDataSelector, isRequestPending } from '../api'

//for only admins
export const teamsEarningSelector = createDataSelector('teamsEarning')
export const teamsEarningLoadingSelector = isRequestPending('teamsEarning', 'GET')

export const selectedTeamEarningSelector = createDataSelector('selectedTeamEarning')
export const selectedTeamEarningLoadingSelector = isRequestPending('selectedTeamEarning', 'GET')

//for both admins and team-managers
export const totalEarningSelector = createDataSelector('totalEarning')
export const totalEarningLoadingSelector = isRequestPending('totalEarning', 'GET')

export const developersEarningSelector = createDataSelector('developersEarning')
export const developersEarningLoadingSelector = isRequestPending('developersEarning', 'GET')

export const individualDeveloperEarningSelector = createDataSelector('individualDeveloperEarning')
export const individualDeveloperEarningLoadingSelector = isRequestPending('individualDeveloperEarning', 'GET')

export const individualDeveloperProjectEarningSelector = createDataSelector('individualDeveloperProjectEarning')
export const individualDeveloperProjectEarningLoadingSelector = isRequestPending(
  'individualDeveloperProjectEarning',
  'GET'
)

//for only developers
export const selfEarningReportSelector = createDataSelector('selfEarning')
export const selfEarningReportLoadingSelector = isRequestPending('selfEarning', 'GET')

export const selfProjectEarningSelector = createDataSelector('selfProjectEarning')
export const selfProjectEarningLodaingSelector = isRequestPending('selfProjectEarning')
