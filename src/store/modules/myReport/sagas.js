import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getMyReport = createApiCallSaga({
  type: Types.GET_MY_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`reports/${payload.period}/`)
  },
  selectorKey: 'myReport',
  allowedParamKeys: ['page', 'page_size', 'from', 'to']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_MY_REPORT, getMyReport)
}
