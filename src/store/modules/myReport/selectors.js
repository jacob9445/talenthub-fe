import { createDataSelector, isRequestPending } from '../api'

export const myReportSelector = createDataSelector('myReport')

export const myReportLoadingSelector = state => isRequestPending('myReport', 'GET')(state)
