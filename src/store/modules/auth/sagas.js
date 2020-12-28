import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_GETPROFILE, AUTH_SAVEPROFILE} from './types'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: 'api/auth/login/',
  selectorKey: 'auth',
  success: (res) => {
    localStorage.setItem('authentication', JSON.stringify(res))
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
    const token = JSON.parse(localStorage.getItem('authentication')).token
    localStorage.setItem('authentication', JSON.stringify({
      info: res,
      token      
    }))
  }
})

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, authLogin)
  yield takeLatest(AUTH_SIGNUP, authSignup)
  yield takeLatest(AUTH_GETPROFILE, authGetProfile)
  yield takeLatest(AUTH_SAVEPROFILE, authSaveProfile)
}
