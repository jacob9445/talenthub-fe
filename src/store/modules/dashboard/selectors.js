import { createDataSelector, isRequestPending, isRequestNil } from '../api'

export const ongoingProjectsSelector = createDataSelector('ongoing_projects')
export const weeklyIncomeSelector = createDataSelector('weekly_income')
export const statsSelector = createDataSelector('stats')
export const pendingRequestsSelector = createDataSelector('pending_requests')
export const approvedRequestsSelector = createDataSelector('approved_requests')

export const ongoingProjectsLoadingSelector = state =>
  isRequestPending('ongoing_projects', 'GET')(state) || isRequestNil('ongoing_projects', 'GET')(state)

export const weeklyIncomeLoadingSelector = state =>
  isRequestPending('weekly_income', 'GET')(state) || isRequestNil('weekly_income', 'GET')(state)

export const statsLoadingSelector = state =>
  isRequestPending('stats', 'GET')(state) || isRequestNil('stats', 'GET')(state)

export const pendingRequestsLoadingSelector = state =>
  isRequestPending('pending_requests', 'GET')(state) || isRequestNil('pending_requests', 'GET')(state)

export const approvedRequestsLoadingSelector = state =>
  isRequestPending('approved_requests', 'GET')(state) || isRequestNil('approved_requests', 'GET')(state)
