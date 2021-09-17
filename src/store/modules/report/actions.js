import { createAction } from 'redux-actions'
import * as Types from './types'

export const getIndividualReport = createAction(Types.GET_INDIVIDUALREPORT)
export const getMyReport = createAction(Types.GET_MY_REPORT)
export const getTeamReport = createAction(Types.GET_TEAMREPORT)
export const getMyTeamReports = createAction(Types.GET_MY_TEAM_REPORTS)
