import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'
import { ROLES } from 'config/constants'

const getUsers = apiCallSaga({
  type: Types.USERS_GETUSERS,
  method: 'GET',
  path: ({payload}) => {
    if( payload.role === ROLES.ADMIN)
      return 'api/admin/users/'
    else if( payload.role === ROLES.TEAM_MANAGER)
      return 'api/team-manager/users/'
  },
  selectorKey: 'users'
})

export default function* rootSaga() {
  yield takeLatest(Types.USERS_GETUSERS, getUsers)
}