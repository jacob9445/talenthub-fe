import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getProfiles = apiCallSaga({
  type: Types.GET_PROFILES,
  method: 'GET',
  path: 'api/admin/profiles',
  selectorKey: 'profiles'
})

const getProfileDetail = apiCallSaga({
  type: Types.GET_PROFILE_DETAIL,
  method: 'GET',
  path: ({payload}) => (`api/admin/profiles/${payload}/`),
  selectorKey: 'profileDetail'
})

const updateProfile = apiCallSaga({
  type: Types.UPDATE_PROFILE,
  method: 'PUT',
  path: ({payload:{id}}) => (`api/admin/profiles/${id}/`),
})

const deleteProfile = apiCallSaga({
  type: Types.DELETE_PROFILE,
  method: 'DELETE',
  path: ({payload}) => (`api/admin/profiles/${payload}/`),
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROFILES, getProfiles)
  yield takeLatest(Types.GET_PROFILE_DETAIL, getProfileDetail)
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile)
  yield takeLatest(Types.DELETE_PROFILE, deleteProfile)
}
