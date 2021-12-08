import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getProjects = createApiCallSaga({
  type: Types.GET_PROJECTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('projects/')
  },
  selectorKey: 'projects',
  allowedParamKeys: ['page', 'page_size']
})

const deleteProject = createApiCallSaga({
  type: Types.DELETE_PROJECT,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload.id}/`)
  }
})

const deleteProjectAndRefresh = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) {
    yield deleteProject(action)
    yield getProjects({
      payload: action.payload
    })
  }
}

const getProjectDetail = createApiCallSaga({
  type: Types.GET_PROJECT_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload}/`)
  },
  selectorKey: 'projectDetail'
})

const updateProjectDetail = createApiCallSaga({
  type: Types.UPDATE_PROJECT_DETAIL,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`projects/${payload.id}/`)
  }
})

const createProject = createApiCallSaga({
  type: Types.CREATE_PROJECT,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`projects/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Project created successfully!'
      })
    )
  }
})

const searchProjects = createApiCallSaga({
  type: Types.SEARCH_PROJECTS,
  method: 'GET',
  path: `api/search/projects/`,
  selectorKey: 'projectsSearchResults',
  allowedParamKeys: ['project_starter', 'team']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROJECTS, getProjects)
  yield takeLatest(Types.DELETE_PROJECT, deleteProject)
  yield takeLatest(Types.DELETE_PROJECT_AND_REFRESH, deleteProjectAndRefresh)
  yield takeLatest(Types.GET_PROJECT_DETAIL, getProjectDetail)
  yield takeLatest(Types.UPDATE_PROJECT_DETAIL, updateProjectDetail)
  yield takeLatest(Types.CREATE_PROJECT, createProject)
  yield takeLatest(Types.SEARCH_PROJECTS, searchProjects)
}
