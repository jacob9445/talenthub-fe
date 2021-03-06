import { createAction } from 'redux-actions'
import * as Types from './types'

export const getDailyLogs = createAction(Types.GET_DAILY_LOGS)
export const getDailyLogDetail = createAction(Types.GET_DAILY_LOG_DETAIL)

export const getMonthlyLogs = createAction(Types.GET_MONTHLY_LOGS)
export const getMonthlyLogDetail = createAction(Types.GET_MONTHLY_LOG_DETAIL)
export const retrieveMonthlyLog = createAction(Types.RETRIEVE_MONTHLY_LOG)

export const getWeeklyLogs = createAction(Types.GET_WEEKLY_LOGS)
export const getWeeklyLogDetail = createAction(Types.GET_WEEKLY_LOG_DETAIL)

export const retrieveWeeklyLog = createAction(Types.RETRIEVE_WEEKLY_LOG)
export const retrieveDailyLog = createAction(Types.RETRIEVE_DAILY_LOG)
