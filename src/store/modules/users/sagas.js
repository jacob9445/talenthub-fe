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

const getCertainUser = apiCallSaga({
  type: Types.GET_CERTAIN_USER,
  method: 'GET',
  path: ({payload}) => (`api/admin/users/${payload}/`),
  selectorKey: 'certain_user'
})

const updateCertainUser = apiCallSaga({
  type: Types.UPDATE_CERTAIN_USER,
  method: 'PUT',
  path: ({payload:{id}}) => (`api/admin/users/${id}/`),
})

const createUser = apiCallSaga({
  type: Types.CREATE_USER,
  method: 'POST',
  path: 'api/auth/register/'
})

export default function* rootSaga() {
  yield takeLatest(Types.USERS_GETUSERS, getUsers)
  yield takeLatest(Types.USERS_DELETEUSER, deleteUser)
  yield takeLatest(Types.USERS_DELETE_USER_AND_REFRESH, deleteUserAndRefresh)
  yield takeLatest(Types.GET_CERTAIN_USER, getCertainUser)
  yield takeLatest(Types.UPDATE_CERTAIN_USER, updateCertainUser)
  yield takeLatest(Types.CREATE_USER, createUser)
}
