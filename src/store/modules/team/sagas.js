import { takeLatest, put } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { showMessage } from '../message'

const getTeams = apiCallSaga({
  type: Types.GET_TEAMS,
  method: 'GET',
  path: 'api/admin/teams/',
  selectorKey: 'teams'
})

const getTeamMembers = apiCallSaga({
  type: Types.GET_TEAM_MEMBERS,
  method: 'GET',
  path: ({ payload }) => `api/admin/teams/${payload}/users/`,
  selectorKey: payload => `teamMembers_${payload}`
})

const createTeam = apiCallSaga({
  type: Types.CREATE_TEAM,
  method: 'POST',
  path: 'api/admin/teams/',
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'A new team created successfully!'
      })
    )
  }
})

const getTeamDetail = apiCallSaga({
  type: Types.GET_TEAM_DETAIL,
  method: 'GET',
  path: ({ payload }) => `api/admin/teams/${payload}/`,
  selectorKey: 'teamDetail'
})

const updateTeam = apiCallSaga({
  type: Types.UPDATE_TEAM,
  method: 'PUT',
  path: ({ payload: { id } }) => `api/admin/teams/${id}/`,
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'The team updated successfully!'
      })
    )
  }
})

const deleteTeam = apiCallSaga({
  type: Types.DELETE_TEAM,
  method: 'DELETE',
  path: ({ payload }) => `api/admin/teams/${payload.id}/`,
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'The team deleted successfully!'
      })
    )
  }
})

const deleteTeamAndRefresh = function*(action) {
  yield deleteTeam(action)
  yield getTeams({
    type: Types.GET_TEAMS,
    payload: {}
  })
}

const createTeamAndRefresh = function*(action) {
  yield createTeam(action)
  yield getTeams({
    type: Types.GET_TEAMS,
    payload: {}
  })
}

const updateTeamAndRefresh = function*(action) {
  yield updateTeam(action)
  yield getTeams({
    type: Types.GET_TEAMS,
    payload: {}
  })
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_TEAMS, getTeams)
  yield takeLatest(Types.GET_TEAM_MEMBERS, getTeamMembers)
  yield takeLatest(Types.CREATE_TEAM, createTeam)
  yield takeLatest(Types.DELETE_TEAM, deleteTeam)
  yield takeLatest(Types.DELETE_TEAM_AND_REFRESH, deleteTeamAndRefresh)
  yield takeLatest(Types.GET_TEAM_DETAIL, getTeamDetail)
  yield takeLatest(Types.UPDATE_TEAM, updateTeam)
  yield takeLatest(Types.CREATE_TEAM_AND_REFRESH, createTeamAndRefresh)
  yield takeLatest(Types.UPDATE_TEAM_AND_REFRESH, updateTeamAndRefresh)
}
