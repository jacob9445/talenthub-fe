import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_GETPROFILE, AUTH_SAVEPROFILE, AUTH_LOGOUT} from './types'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: 'api/auth/login/',
  selectorKey: 'profile',
  payloadOnSuccess: (res) => {
    localStorage.setItem('TH_TOKEN', JSON.stringify(res.token))
    return res.info
  }
})

const authSignup = apiCallSaga({
  type: AUTH_SIGNUP,
  method: 'post',
  path: '/auth/register/',
})

const authGetProfile = apiCallSaga({
  type: AUTH_GETPROFILE,
  method: 'get',
  path: '/users/profile/',
  selectorKey: 'profile'
})

const authSaveProfile = apiCallSaga({
  type: AUTH_SAVEPROFILE,
  method: 'put',
  path: '/users/profile/',
  success: (res) => {
    const token = JSON.parse(localStorage.getItem('TH_TOKEN')).token
    localStorage.setItem('TH_TOKEN', JSON.stringify({
      info: res,
      token      
    }))
  }
})

const authLogout = function() {
  localStorage.removeItem('TH_TOKEN')
} 

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_SIGNUP, authSignup)
  yield takeLatest(AUTH_GETPROFILE, authGetProfile)
  yield takeLatest(AUTH_SAVEPROFILE, authSaveProfile)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}
