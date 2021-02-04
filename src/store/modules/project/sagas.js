import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getProjects = apiCallSaga({
  type: Types.GET_PROJECTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('projects/')
  },
  selectorKey: 'projects'
})

const deleteProject = apiCallSaga({
  type: Types.DELETE_PROJECT,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload.id}`)
  }
})

const deleteProjectAndRefresh = function*(action) {
  yield deleteProject(action)
  yield getProjects({
    payload: action.payload
  })
}

const getProjectDetail = apiCallSaga({
  type: Types.GET_PROJECT_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload}`)
  },
  selectorKey: 'projectDetail'
})

const updateProjectDetail = apiCallSaga({
  type: Types.UPDATE_PROJECT_DETAIL,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload.id}/`)
  }
})

const createProject = apiCallSaga({
  type: Types.CREATE_PROJECT,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`projects/`)
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROJECTS, getProjects)
  yield takeLatest(Types.DELETE_PROJECT, deleteProject)
  yield takeLatest(Types.DELETE_PROJECT_AND_REFRESH, deleteProjectAndRefresh)
  yield takeLatest(Types.GET_PROJECT_DETAIL, getProjectDetail)
  yield takeLatest(Types.UPDATE_PROJECT_DETAIL, updateProjectDetail)
  yield takeLatest(Types.CREATE_PROJECT, createProject)
}
