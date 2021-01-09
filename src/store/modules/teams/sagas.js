import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getTeams = apiCallSaga({
  type: Types.GET_TEAMS,
  method: 'GET',
  path: 'api/admin/teams/',
  selectorKey: 'teams'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_TEAMS, getTeams)
}
