import { createDataSelector, isRequestPending } from '../api'

export const individualReportSelector = createDataSelector('individualReport')
export const individualReportLoadingSelector = state => isRequestPending('individualReport', 'GET')(state)

export const myReportSelector = createDataSelector('myReport')
export const myReportLoadingSelector = state => isRequestPending('myReport', 'GET')(state)

export const teamReportSelector = createDataSelector('teamReport')
export const teamReportLoadingSelector = state => isRequestPending('teamReport', 'GET')(state)

export const myTeamReportSelector = createDataSelector('myTeamReports')
export const myTeamReportLoadingSelector = state => isRequestPending('myTeamReports', 'GET')(state)
