import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getProfiles = createApiCallSaga({
  type: Types.GET_PROFILES,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('profiles/')
  },
  selectorKey: 'profiles',
  allowedParamKeys: ['page', 'page_size', 'search']
})

const getProfileDetail = createApiCallSaga({
  type: Types.GET_PROFILE_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`profiles/${payload}/`)
  },
  selectorKey: 'profileDetail'
})

const updateProfile = createApiCallSaga({
  type: Types.UPDATE_PROFILE,
  method: 'PUT',
  path: function*({ payload: { id } }) {
    return yield roleBasedPath(`profiles/${id}/`)
  }
})

const deleteProfile = createApiCallSaga({
  type: Types.DELETE_PROFILE,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`profiles/${payload.id}/`)
  }
})

const deleteProfileAndRefresh = function*(action) {
  yield deleteProfile(action)
  yield getProfiles({
    type: Types.GET_PROFILES
  })
}

const createProfile = createApiCallSaga({
  type: Types.CREATE_PROFILE,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`profiles/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Profile created successfully!'
      })
    )
  }
})

const processDeleteAndRefreshProfile = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (!confirmed) return
  yield deleteProfileAndRefresh(action)
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROFILES, getProfiles)
  yield takeLatest(Types.GET_PROFILE_DETAIL, getProfileDetail)
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile)
  yield takeLatest(Types.DELETE_PROFILE, deleteProfile)
  yield takeLatest(Types.DELETE_PROFILE_AND_REFRESH, processDeleteAndRefreshProfile)
  yield takeLatest(Types.CREATE_PROFILE, createProfile)
}
