import { put, takeLatest, select } from 'redux-saga/effects'
import { createApiCallSaga, REQUEST_SUCCESS } from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_GETME, AUTH_LOGOUT, AUTH_UPDATEME, AUTH_UPDATE_PASSWORD } from './types'
import { authSuccess, authFail } from './actions'
import { clearApiState } from '../api'
import { API_AUTH_GET_URL } from 'config/constants'
import { notificationsSelector, openNC } from '../notification'
import { showMessage } from '../message'
import { takeApiResult } from 'helpers/sagaHelpers'
import { SNACKBAR_TOUCHED, NOTIFICATION_IDS, TOKEN } from 'config/constants'
import { setSnackbarTouched } from 'helpers/utils'

const authLogin = createApiCallSaga({
  type: AUTH_LOGIN,
  method: 'post',
  path: 'api/auth/login/',
  selectorKey: 'auth',
  success: function*(resData) {
    localStorage.setItem(TOKEN, JSON.stringify(resData.token))
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
    setSnackbarTouched(false)
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

const authSignup = createApiCallSaga({
  type: AUTH_SIGNUP,
  method: 'post',
  path: '/auth/register/'
})

const authGetMe = createApiCallSaga({
  type: AUTH_GETME,
  method: 'get',
  path: API_AUTH_GET_URL,
  selectorKey: 'me'
})

const authUpdateMe = createApiCallSaga({
  type: AUTH_UPDATEME,
  method: 'put',
  path: API_AUTH_GET_URL,
  selectorKey: 'me'
})

const authUpdatePassowrd = createApiCallSaga({
  type: AUTH_UPDATE_PASSWORD,
  method: 'put',
  path: '/api/auth/update-password/',
  selectorKey: 'password'
})

const authLogout = function*() {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(SNACKBAR_TOUCHED)
  localStorage.removeItem(NOTIFICATION_IDS)
  yield put(clearApiState())
}

export default function* rootSaga() {
  yield takeLatest(AUTH_LOGIN, processAuthLogin)
  yield takeLatest(AUTH_SIGNUP, authSignup)
  yield takeLatest(AUTH_GETME, authGetMe)
  yield takeLatest(AUTH_UPDATEME, authUpdateMe)
  yield takeLatest(AUTH_UPDATE_PASSWORD, authUpdatePassowrd)
  yield takeLatest(AUTH_LOGOUT, authLogout)
}
