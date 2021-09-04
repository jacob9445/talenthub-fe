import { createDataSelector, isRequestPending } from '../api'

export const dailyLogsSelector = createDataSelector('dailyLogs')
export const dailyLogsLoadingSelector = state => isRequestPending('dailyLogs', 'GET')(state)

export const dailyLogDetailSelector = createDataSelector('dailyLogDetail')
export const dailyLogDetailLoadingSelector = state => isRequestPending('dailyLogDetail', 'GET')(state)

export const monthlyLogsSelector = createDataSelector('monthlyLogs')
export const monthlyLogsLoadingSelector = state => isRequestPending('monthlyLogs', 'GET')(state)

export const monthlyLogDetailSelector = createDataSelector('monthlyLogDetail')
export const monthlyLogDetailLoadingSelector = state => isRequestPending('monthlyLogDetail', 'GET')(state)

export const weeklyLogsSelector = createDataSelector('weeklyLogs')
export const weeklyLogLoadingSelector = state => isRequestPending('weeklyLogs', 'GET')(state)

export const weeklyLogDetailSelector = createDataSelector('weeklyLogDetail')
export const weeklyLogDetailLoadingSelector = state => isRequestPending('weeklyLogDetail', 'GET')(state)
