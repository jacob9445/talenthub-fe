import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getDailyLogs = apiCallSaga({
  type: Types.GET_DAILY_LOGS,
  method: 'GET',
  path: function*({ payload: { date } = {} }) {
    const path = date ? `logging/daily-logs/${date}/` : 'logging/daily-logs/'
    return yield roleBasedPath(path)
  },
  selectorKey: 'dailyLogs',
  allowedParamKeys: ['page', 'page_size']
})

const getDailyLogDetail = apiCallSaga({
  type: Types.GET_DAILY_LOG_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`logging/daily-logs/${payload}/`)
  },
  selectorKey: 'dailyLogDetail'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_DAILY_LOGS, getDailyLogs)
  yield takeLatest(Types.GET_DAILY_LOG_DETAIL, getDailyLogDetail)
}
