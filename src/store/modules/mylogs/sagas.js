import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getMyDailyLog = createApiCallSaga({
  type: Types.GET_MY_Daily_LOG,
  method: 'GET',
  path: function*({ payload: { date } = {} }) {
    const path = date ? `my-logs/daily/${date}/` : 'my-logs/daily/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'myDailyLog',
  allowedParamKeys: ['page', 'page_size']
})

const createMyDailyLog = createApiCallSaga({
  type: Types.CREATE_MY_Daily_LOG,
  method: 'POST',
  selectorKey: 'myDailyLog',
  path: function*({ payload }) {
    return yield roleBasedPath('my-logs/')
  }
})

const updateMyDailyLog = createApiCallSaga({
  type: Types.UPDATE_MY_Daily_LOG,
  method: 'patch',
  selectorKey: 'myDailyLog',
  path: function*({ payload }) {
    return yield roleBasedPath(`my-logs/${payload.id}/`)
  }
})

const getMyMonthlyLog = createApiCallSaga({
  type: Types.GET_MY_MONTHLY_LOG,
  method: 'GET',
  path: function*({ payload: { year, month } = {} }) {
    const path = year && month ? `my-logs/monthly/${year}-${month}/` : 'my-logs/monthly/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'myMonthlyLog',
  allowedParamKeys: ['page', 'page_size']
})

const createMyMonthlyLog = createApiCallSaga({
  type: Types.CREATE_MY_MONTHLY_LOG,
  method: 'POST',
  selectorKey: 'myMonthlyLog',
  path: function*({ payload }) {
    return yield roleBasedPath('my-logs/')
  }
})

const getMyWeeklyLog = createApiCallSaga({
  type: Types.GET_MY_WEEKLY_LOG,
  method: 'GET',
  path: function*({ payload: { year, week } = {} }) {
    const path = year ? `my-logs/weekly/${year}-${week}/` : 'my-logs/weekly/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'myWeeklyLog',
  allowedParamKeys: ['page', 'page_size']
})

const createMyWeeklyLog = createApiCallSaga({
  type: Types.CREATE_MY_WEEKLY_LOG,
  method: 'POST',
  selectorKey: 'myWeeklyLog',
  path: function*() {
    return yield roleBasedPath('my-logs/')
  }
})

const updateMyMonthlyLog = createApiCallSaga({
  type: Types.UPDATE_MY_MONTHLY_LOG,
  method: 'patch',
  selectorKey: 'myMonthlyLog',
  path: function*({ payload }) {
    return yield roleBasedPath(`my-logs/${payload.id}/`)
  }
})

const updateMyWeeklyLog = createApiCallSaga({
  type: Types.UPDATE_MY_WEEKLY_LOG,
  method: 'patch',
  selectorKey: 'myWeeklyLog',
  path: function*({ payload }) {
    return yield roleBasedPath(`my-logs/${payload.id}/`)
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_MY_Daily_LOG, getMyDailyLog)
  yield takeLatest(Types.CREATE_MY_Daily_LOG, createMyDailyLog)
  yield takeLatest(Types.UPDATE_MY_Daily_LOG, updateMyDailyLog)
  yield takeLatest(Types.GET_MY_MONTHLY_LOG, getMyMonthlyLog)
  yield takeLatest(Types.CREATE_MY_MONTHLY_LOG, createMyMonthlyLog)
  yield takeLatest(Types.UPDATE_MY_MONTHLY_LOG, updateMyMonthlyLog)
  yield takeLatest(Types.GET_MY_WEEKLY_LOG, getMyWeeklyLog)
  yield takeLatest(Types.CREATE_MY_WEEKLY_LOG, createMyWeeklyLog)
  yield takeLatest(Types.UPDATE_MY_WEEKLY_LOG, updateMyWeeklyLog)
}
