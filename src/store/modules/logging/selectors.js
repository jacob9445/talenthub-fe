import { createDataSelector, isRequestPending } from '../api'

export const dailyLogsSelector = createDataSelector('dailyLogs')
export const dailyLogsLoadingSelector = state => isRequestPending('dailyLogs', 'GET')(state)

export const dailyLogDetailSelector = createDataSelector('dailyLogDetail')
export const dailyLogDetailLoadingSelector = state => isRequestPending('dailyLogDetail', 'GET')(state)
