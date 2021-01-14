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
  type: Types.GET_SELECTED_PROFILE,
  method: 'GET',
  path: ({payload}) => (`api/admin/profiles/${payload}/`),
  selectorKey: 'profileDetail'
})

const updateProfile = apiCallSaga({
  type: Types.UPDATE_PROFILE,
  method: 'PUT',
  path: ({payload:{id}}) => (`api/admin/profiles/${id}/`),
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PROFILES, getProfiles)
  yield takeLatest(Types.GET_SELECTED_PROFILE, getProfileDetail)
  yield takeLatest(Types.UPDATE_PROFILE, updateProfile)
}
