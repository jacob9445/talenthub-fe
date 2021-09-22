import { createDataSelector, isRequestPending } from '../api'

export const dailyLogsSelector = createDataSelector('dailyLogs')
export const dailyLogsLoadingSelector = isRequestPending('dailyLogs', 'GET')

export const dailyLogDetailSelector = createDataSelector('dailyLogDetail')
export const dailyLogDetailLoadingSelector = isRequestPending('dailyLogDetail', 'GET')

export const weeklyLogsSelector = createDataSelector('weeklyLogs')
export const weeklyLogLoadingSelector = isRequestPending('weeklyLogs', 'GET')

export const weeklyLogDetailSelector = createDataSelector('weeklyLogDetail')
export const weeklyLogDetailLoadingSelector = isRequestPending('weeklyLogDetail', 'GET')

export const monthlyLogsSelector = createDataSelector('monthlyLogs')
export const monthlyLogsLoadingSelector = isRequestPending('monthlyLogs', 'GET')

export const monthlyLogDetailSelector = createDataSelector('monthlyLogDetail')
export const monthlyLogDetailLoadingSelector = isRequestPending('monthlyLogDetail', 'GET')

export const dailyLogStatusLoadingSelector = isRequestPending('retrieveDailyLog', 'GET')
export const weeklyLogStatusLoadingSelector = isRequestPending('retrieveWeeklyLog', 'GET')
export const monthlyLogStatusLoadingSelector = isRequestPending('retrieveMonthlyLog', 'GET')
