import { createDataSelector, isRequestPending } from '../api'

export const teamReportSelector = createDataSelector('teamReport')

export const teamReportLoadingSelector = state => isRequestPending('teamReport', 'GET')(state)
