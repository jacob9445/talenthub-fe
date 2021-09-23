import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getDailyLogs = createApiCallSaga({
  type: Types.GET_DAILY_LOGS,
  method: 'GET',
  path: function*({ payload: { date } = {} }) {
    const path = date ? `logging/daily-logs/${date}/` : 'logging/daily-logs/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'dailyLogs',
  allowedParamKeys: ['page', 'page_size', 'owner']
})

const getDailyLogDetail = createApiCallSaga({
  type: Types.GET_DAILY_LOG_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`logging/daily-logs/${payload.id}/`)
  },
  selectorKey: 'dailyLogDetail',
  footprint: payload => ({ id: Number(payload.id) })
})

const retrieveDailyLog = createApiCallSaga({
  type: Types.RETRIEVE_DAILY_LOG,
  method: 'GET',
  path: function*({ payload: { date } = {} }) {
    const path = date ? `logging/daily-logs/${date}/` : 'logging/daily-logs/'
    return yield roleBasedPath(path)
  },
  payloadOnSuccess: (resData, action) => {
    return resData.results ? resData.results[0] : {}
  },
  selectorKey: 'dailyLogDetail',
  requestSelectorKey: 'retrieveDailyLog',
  allowedParamKeys: ['page', 'page_size', 'owner'],
  footprint: payload => ({ createdAt: payload.date, owner: payload.params.owner })
})

const getMonthlyLogs = createApiCallSaga({
  type: Types.GET_MONTHLY_LOGS,
  method: 'GET',
  path: function*({ payload: { year, month } = {} }) {
    const path = year ? `logging/monthly-logs/${year}-${month}/` : 'logging/monthly-logs/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'monthlyLogs',
  allowedParamKeys: ['page', 'page_size', 'owner']
})

const retrieveMonthlyLog = createApiCallSaga({
  type: Types.RETRIEVE_MONTHLY_LOG,
  method: 'GET',
  path: function*({ payload: { year, month } = {} }) {
    const path = year ? `logging/monthly-logs/${year}-${month}/` : 'logging/monthly-logs/'
    return yield roleBasedPath(path)
  },
  payloadOnSuccess: (resData, action) => (resData.results.length ? resData.results[0] : {}),
  selectorKey: 'monthlyLogDetail',
  requestSelectorKey: 'retrieveMonthlyLog',
  allowedParamKeys: ['page', 'page_size', 'owner']
})

const getMonthlyLogDetail = createApiCallSaga({
  type: Types.GET_MONTHLY_LOG_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`logging/monthly-logs/${payload.id}/`)
  },
  selectorKey: 'monthlyLogDetail'
})

const getWeeklyLogs = createApiCallSaga({
  type: Types.GET_WEEKLY_LOGS,
  method: 'GET',
  path: function*({ payload: { year, week } = {} }) {
    const path = year ? `logging/weekly-logs/${year}-${week}/` : 'logging/weekly-logs/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'weeklyLogs',
  allowedParamKeys: ['page', 'page_size', 'owner']
})

const getWeeklyLogDetail = createApiCallSaga({
  type: Types.GET_WEEKLY_LOG_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`logging/weekly-logs/${payload.id}/`)
  },
  selectorKey: 'weeklyLogDetail'
})

const retrieveWeeklyLog = createApiCallSaga({
  type: Types.RETRIEVE_WEEKLY_LOG,
  method: 'GET',
  path: function*({ payload: { year, week } = {} }) {
    const path = year ? `logging/weekly-logs/${year}-${week}/` : 'logging/weekly-logs/'
    return yield roleBasedPath(path)
  },
  payloadOnSuccess: (resData, action) => (resData.results.length ? resData.results[0] : {}),
  selectorKey: 'weeklyLogDetail',
  requestSelectorKey: 'retrieveWeeklyLog',
  allowedParamKeys: ['page', 'page_size', 'owner']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_DAILY_LOGS, getDailyLogs)
  yield takeLatest(Types.GET_DAILY_LOG_DETAIL, getDailyLogDetail)
  yield takeLatest(Types.GET_MONTHLY_LOGS, getMonthlyLogs)
  yield takeLatest(Types.GET_MONTHLY_LOG_DETAIL, getMonthlyLogDetail)
  yield takeLatest(Types.GET_WEEKLY_LOGS, getWeeklyLogs)
  yield takeLatest(Types.GET_WEEKLY_LOG_DETAIL, getWeeklyLogDetail)
  yield takeLatest(Types.RETRIEVE_WEEKLY_LOG, retrieveWeeklyLog)
  yield takeLatest(Types.RETRIEVE_DAILY_LOG, retrieveDailyLog)
  yield takeLatest(Types.RETRIEVE_MONTHLY_LOG, retrieveMonthlyLog)
}
