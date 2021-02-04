import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import { roleBasedPath } from 'helpers/sagaHelpers'
import * as Types from './types'

const getDashboardInfo = apiCallSaga({
  type: Types.GET_DASHBOARD_INFO,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('dashboard/')
  },
  selectorKey: 'dashboard'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_DASHBOARD_INFO, getDashboardInfo)
}
