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

export default function* rootSaga() {
  yield takeLatest(Types.GET_MY_Daily_LOG, getMyDailyLog)
  yield takeLatest(Types.CREATE_MY_Daily_LOG, createMyDailyLog)
  yield takeLatest(Types.UPDATE_MY_Daily_LOG, updateMyDailyLog)
}
