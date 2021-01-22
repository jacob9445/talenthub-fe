import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_GETME, AUTH_LOGOUT } from './types'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: 'api/auth/login/',
  selectorKey: 'auth',
  success: res => {
    localStorage.setItem('TH_TOKEN', JSON.stringify(res.token))
  }
})

const authSignup = apiCallSaga({
  type: AUTH_SIGNUP,
  method: 'post',
  path: '/auth/register/'
})

const authGetMe = apiCallSaga({
  type: AUTH_GETME,
  method: 'get',
  path: 'api/auth/me/',
  selectorKey: 'me'
})

const authLogout = function() {
  localStorage.removeItem('TH_TOKEN')
}

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_SIGNUP, authSignup)
  yield takeLatest(AUTH_GETME, authGetMe)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}
