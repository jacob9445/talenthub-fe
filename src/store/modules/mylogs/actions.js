import { createAction } from 'redux-actions'
import * as types from './types'

export const getMyDailyLog = createAction(types.GET_MY_Daily_LOG)
export const createMyDailyLog = createAction(types.CREATE_MY_Daily_LOG)
export const updateMyDailyLog = createAction(types.UPDATE_MY_Daily_LOG)
