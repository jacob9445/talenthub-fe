import { put, takeLatest, select } from 'redux-saga/effects'
import { apiCallSaga, REQUEST_SUCCESS } from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_GETME, AUTH_LOGOUT } from './types'
import { authSuccess, authFail } from './actions'
import { API_AUTH_GET_URL } from 'config/constants'
import { notificationsSelector, openNC } from '../notification'
import { showMessage } from '../message'
import { takeApiResult } from 'helpers/sagaHelpers'

const authLogin = apiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: 'api/auth/login/',
  selectorKey: 'auth',
  success: function*(resData) {
    localStorage.setItem('TH_TOKEN', JSON.stringify(resData.token))
    yield put(authSuccess())
  },
  fail: function*() {
    yield put(authFail())
  }
})

const processAuthLogin = function*(action) {
  yield authLogin(action)
  let nAction = yield takeApiResult('notifications')
  if (nAction.type === REQUEST_SUCCESS) {
    const notifications = yield select(notificationsSelector)
    if (notifications.count > 0) {
      yield put(
        showMessage({
          message: `You have ${notifications.count} new notifications`,
          variant: 'info',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          },
          actionOnClick: openNC()
        })
      )
    }
  }
}

const authSignup = apiCallSaga({
  type: AUTH_SIGNUP,
  method: 'post',
  path: '/auth/register/'
})

const authGetMe = apiCallSaga({
  type: AUTH_GETME,
  method: 'get',
  path: API_AUTH_GET_URL,
  selectorKey: 'me'
})

const authLogout = function() {
  localStorage.removeItem('TH_TOKEN')
}

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, processAuthLogin)
  yield takeLatest(AUTH_SIGNUP, authSignup)
  yield takeLatest(AUTH_GETME, authGetMe)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}
