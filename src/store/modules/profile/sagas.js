import { put, takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getProfiles = apiCallSaga({
  type: Types.GET_PROFILES,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('profiles/')
  },
  selectorKey: 'profiles'
})

const getProfileDetail = apiCallSaga({
  type: Types.GET_PROFILE_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`profiles/${payload}/`)
  },
  selectorKey: 'profileDetail'
})

const updateProfile = apiCallSaga({
  type: Types.UPDATE_PROFILE,
  method: 'PUT',
  path: function*({ payload: { id } }) {
    return yield roleBasedPath(`profiles/${id}/`)
  }
})

const deleteProfile = apiCallSaga({
  type: Types.DELETE_PROFILE,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`profiles/${payload}/`)
  }
})

const deleteProfileAndRefresh = function*(action) {
  yield deleteProfile(action)
  yield getProfiles({
    type: Types.GET_PROFILES
  })
}

const createProfile = apiCallSaga({
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

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROFILES, getProfiles)
  yield takeLatest(Types.GET_PROFILE_DETAIL, getProfileDetail)
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile)
  yield takeLatest(Types.DELETE_PROFILE, deleteProfile)
  yield takeLatest(Types.DELETE_PROFILE_AND_REFRESH, deleteProfileAndRefresh)
  yield takeLatest(Types.CREATE_PROFILE, createProfile)
}
