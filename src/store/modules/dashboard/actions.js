import { createAction } from 'redux-actions'
import * as Types from './types'

export const getOngoingProjects = createAction(Types.GET_ONGOING_PROJECTS)
export const getWeeklyIncome = createAction(Types.GET_WEEKLY_INCONE)
export const getStats = createAction(Types.GET_STATS)
export const getPendingRequests = createAction(Types.GET_PENDING_REQUESTS)
export const getApprovedRequests = createAction(Types.GET_APPROVED_REQUESTS)
