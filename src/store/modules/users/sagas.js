import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'
import * as constants from 'config/constants'

const getUsers = apiCallSaga({
  type: Types.USERS_GETUSERS,
  method: 'GET',
  path: ({payload}) => {
    if( payload.role === constants.ROLE_ADMIN)
      return 'api/admin/users/'
    else if( payload.role === constants.ROLE_TEAM_MANAGER)
      return 'api/team-manager/users/'
  },
  selectorKey: 'users'
})

export default function* rootSaga() {
  yield takeLatest(Types.USERS_GETUSERS, getUsers)
}