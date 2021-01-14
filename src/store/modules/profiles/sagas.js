import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getProfiles = apiCallSaga({
  type: Types.GET_PROFILES,
  method: 'GET',
  path: 'api/admin/profiles',
  selectorKey: 'profiles'
})


export default function* rootSaga() {
  yield takeLatest(Types.GET_PROFILES, getProfiles)
}
