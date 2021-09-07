import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getMyDailyLog = apiCallSaga({
  type: Types.GET_MY_Daily_LOG,
  method: 'GET',
  path: function*({ payload: { date } = {} }) {
    const path = date ? `my-logs/daily/${date}/` : 'my-logs/daily/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'myDailyLog',
  allowedParamKeys: ['page', 'page_size']
})

const createMyDailyLog = apiCallSaga({
  type: Types.CREATE_MY_Daily_LOG,
  method: 'POST',
  selectorKey: 'myDailyLog',
  path: function*({ payload }) {
    return yield roleBasedPath('my-logs/')
  }
})

const updateMyDailyLog = apiCallSaga({
  type: Types.UPDATE_MY_Daily_LOG,
  method: 'patch',
  selectorKey: 'myDailyLog',
  path: function*({ payload }) {
    return yield roleBasedPath(`my-logs/${payload.id}/`)
  }
})

const getMyMonthlyLog = apiCallSaga({
  type: Types.GET_MY_MONTHLY_LOG,
  method: 'GET',
  path: function*({ payload: { year, month } = {} }) {
    const path = year && month ? `my-logs/monthly/${year}-${month}/` : 'my-logs/monthly/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'myMonthlyLog',
  allowedParamKeys: ['page', 'page_size']
})

const createMyMonthlyLog = apiCallSaga({
  type: Types.CREATE_MY_MONTHLY_LOG,
  method: 'POST',
  selectorKey: 'myMonthlyLog',
  path: function*({ payload }) {
    return yield roleBasedPath('my-logs/')
  }
})

const updateMyMonthlyLog = apiCallSaga({
  type: Types.UPDATE_MY_MONTHLY_LOG,
  method: 'patch',
  selectorKey: 'myMonthlyLog',
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
}
