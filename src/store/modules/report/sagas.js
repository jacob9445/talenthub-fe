import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getIndividualReport = createApiCallSaga({
  type: Types.GET_INDIVIDUALREPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`reports/developer/${payload.period}/`)
  },
  selectorKey: 'individualReport',
  allowedParamKeys: ['page', 'page_size', 'from', 'to', 'team']
})

const getMyReport = createApiCallSaga({
  type: Types.GET_MY_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`reports/${payload.period}/`)
  },
  selectorKey: 'myReport',
  allowedParamKeys: ['page', 'page_size', 'from', 'to']
})

const getTeamReport = createApiCallSaga({
  type: Types.GET_TEAMREPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`reports/team/${payload.period}/`)
  },
  selectorKey: 'teamReport',
  allowedParamKeys: ['from', 'to']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_INDIVIDUALREPORT, getIndividualReport)
  yield takeLatest(Types.GET_MY_REPORT, getMyReport)
  yield takeLatest(Types.GET_TEAMREPORT, getTeamReport)
}
