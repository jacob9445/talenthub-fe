import { createAction } from 'redux-actions'
import * as Types from './types'

export const getDailyLogs = createAction(Types.GET_DAILY_LOGS)
export const getDailyLogDetail = createAction(Types.GET_DAILY_LOG_DETAIL)

export const getMonthlyLogs = createAction(Types.GET_MONTHLY_LOGS)
export const getMonthlyLogDetail = createAction(Types.GET_MONTHLY_LOG_DETAIL)

export const getWeeklyLogs = createAction(Types.GET_WEEKLY_LOGS)
export const getWeeklyLogDetail = createAction(Types.GET_WEEKLY_LOG_DETAIL)
