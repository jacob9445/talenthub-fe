import { createDataSelector, isRequestPending } from '../api'

export const individualReportSelector = createDataSelector('individualReport')

export const individualReportLoadingSelector = state => isRequestPending('individualReport', 'GET')(state)
