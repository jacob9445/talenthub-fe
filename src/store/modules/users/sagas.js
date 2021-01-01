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

const deleteUser = apiCallSaga({
  type: Types.USERS_DELETEUSER,
  method: 'DELETE',
  path: ({payload}) => (`api/admin/users/${payload.id}/`),
})

const deleteUserAndRefresh = function* (action) {
  yield deleteUser(action)
  yield getUsers({
    type: Types.USERS_GETUSERS,
    payload: {
      role: ROLES.ADMIN
    }
  })
}

export default function* rootSaga() {
  yield takeLatest(Types.USERS_GETUSERS, getUsers)
  yield takeLatest(Types.USERS_DELETEUSER, deleteUser)
  yield takeLatest(Types.USERS_DELETE_USER_AND_REFRESH, deleteUserAndRefresh)
}
