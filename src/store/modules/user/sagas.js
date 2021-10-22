import { put, takeLatest, select } from 'redux-saga/effects'
import { createApiCallSaga, setApiData } from '../api'
import * as Types from './types'
import { showMessage } from '../message'
import { createTeamMembersSelector } from 'store/modules/team'
import { unassignedUsersSelector } from 'store/modules/user'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'

const getUsers = createApiCallSaga({
  type: Types.USERS_GETUSERS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('users/')
  },
  selectorKey: 'users',
  allowedParamKeys: ['page', 'page_size']
})

const searchUsers = createApiCallSaga({
  type: Types.SEARCH_USERS,
  method: 'GET',
  path: `api/search/users/`,
  selectorKey: 'userSearchResults',
  allowedParamKeys: ['team', 'search']
})

const deleteUser = createApiCallSaga({
  type: Types.USERS_DELETEUSER,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`users/${payload.id}/`)
  }
})

const deleteUserAndRefresh = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) {
    yield deleteUser(action)
    yield getUsers(action)
  }
}

const getUserDetail = createApiCallSaga({
  type: Types.GET_USER_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`users/${payload}/`)
  },
  selectorKey: 'userDetail'
})

const updateUserDetail = createApiCallSaga({
  type: Types.UPDATE_USER_DETAIL,
  method: 'PATCH',
  path: function*({ payload }) {
    return yield roleBasedPath(`users/${payload.id}/`)
  },
  selectorKey: 'userDetail'
})

const changeUserTeam = createApiCallSaga({
  type: Types.CHANGE_USER_TEAM,
  method: 'PATCH',
  path: ({ payload: { id } }) => `api/admin/users/${id}/`,
  selectorKey: 'userDetail'
})

const processChangeUserTeam = function*(action) {
  const { teamId, status, id: userId } = action.payload || {}
  const teamMembers = yield select(createTeamMembersSelector(teamId))
  const unassignedUsers = yield select(unassignedUsersSelector)
  const selectedUser = unassignedUsers.find(item => item.id === userId)
  const deselectedUser = teamMembers.find(item => item.id === userId)

  if (status) {
    yield put(
      setApiData({
        data: [...teamMembers, selectedUser],
        selectorKey: `teamMembers_${teamId}`
      })
    )
    yield put(
      setApiData({
        data: unassignedUsers.filter(item => item.id !== action.payload.id),
        selectorKey: 'unassignedUsers'
      })
    )
  } else {
    yield put(
      setApiData({
        data: teamMembers.filter(item => item.id !== action.payload.id),
        selectorKey: `teamMembers_${teamId}`
      })
    )
    yield put(
      setApiData({
        data: [...unassignedUsers, deselectedUser],
        selectorKey: 'unassignedUsers'
      })
    )
  }
  yield changeUserTeam(action)
}

const createUser = createApiCallSaga({
  type: Types.CREATE_USER,
  method: 'POST',
  path: 'api/auth/register/',
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'User created successfully!'
      })
    )
  }
})

const getTeamUnassignedUsers = createApiCallSaga({
  type: Types.GET_TEAM_UNASSIGNED_USERS,
  method: 'get',
  path: 'api/admin/teams/unassigned-users/',
  selectorKey: 'unassignedUsers'
})

export default function* rootSaga() {
  yield takeLatest(Types.USERS_GETUSERS, getUsers)
  yield takeLatest(Types.USERS_DELETEUSER, deleteUser)
  yield takeLatest(Types.USERS_DELETE_USER_AND_REFRESH, deleteUserAndRefresh)
  yield takeLatest(Types.GET_USER_DETAIL, getUserDetail)
  yield takeLatest(Types.UPDATE_USER_DETAIL, updateUserDetail)
  yield takeLatest(Types.CREATE_USER, createUser)
  yield takeLatest(Types.CHANGE_USER_TEAM, processChangeUserTeam)
  yield takeLatest(Types.GET_TEAM_UNASSIGNED_USERS, getTeamUnassignedUsers)
  yield takeLatest(Types.SEARCH_USERS, searchUsers)
}
