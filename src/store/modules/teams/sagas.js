import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getTeams = apiCallSaga({
  type: Types.GET_TEAMS,
  method: 'GET',
  path: 'api/admin/teams/',
  selectorKey: 'teams'
})

const getTeamMembers = apiCallSaga({
  type: Types.GET_TEAM_MEMBERS,
  method: 'GET',
  path: ({payload}) => (`api/admin/teams/${payload}/users/`),
  selectorKey:(payload) => (`teamMembers_${payload}`)
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_TEAMS, getTeams)
  yield takeLatest(Types.GET_TEAM_MEMBERS, getTeamMembers)
}
