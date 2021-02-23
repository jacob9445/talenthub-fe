import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getIndividualReport = apiCallSaga({
  type: Types.GET_INDIVIDUALREPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`reports/developer/${payload}/`)
  },
  selectorKey: 'individualReport'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_INDIVIDUALREPORT, getIndividualReport)
}
