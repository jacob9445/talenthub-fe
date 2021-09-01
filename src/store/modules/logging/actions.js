import { createAction } from 'redux-actions'
import * as Types from './types'

export const getDailyLogs = createAction(Types.GET_DAILY_LOGS)
export const getDailyLogDetail = createAction(Types.GET_DAILY_LOG_DETAIL)
