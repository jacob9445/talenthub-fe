import { takeLatest } from 'redux-saga/effects'
import { select, put } from 'redux-saga/effects'
import { apiCallSaga, setApiData } from '../api'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { notificationsSelector } from './selectors'
import * as Types from './types'

const getNotifications = apiCallSaga({
  type: Types.GET_NOTIFICATIONS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('notifications/')
  },
  selectorKey: 'notifications'
})

const getNotificationDetail = apiCallSaga({
  type: Types.GET_NOTIFICATION_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`notifications/${payload.id}/`)
  },
  selectorKey: 'notificationDetail'
})

const setStatusRead = apiCallSaga({
  type: Types.SET_STATUS_READ,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`notifications/${payload.id}/read/`)
  }
})

const processRead = function*(action) {
  const notifications = yield select(notificationsSelector)
  notifications.results = notifications.results.filter(item => item.id !== action.payload.id)
  yield put(
    setApiData({
      data: notifications,
      selectorKey: 'notifications'
    })
  )
  yield setStatusRead(action)
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_NOTIFICATIONS, getNotifications)
  yield takeLatest(Types.GET_NOTIFICATION_DETAIL, getNotificationDetail)
  yield takeLatest(Types.SET_STATUS_READ, processRead)
}
