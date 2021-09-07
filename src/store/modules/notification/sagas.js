import { takeLatest } from 'redux-saga/effects'
import { select, put, take, fork, cancel, delay } from 'redux-saga/effects'
import { apiCallSaga, setApiData } from '../api'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { notificationsSelector } from './selectors'
import * as Types from './types'
import * as Actions from './actions'

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

const setAllRead = apiCallSaga({
  type: Types.SET_ALL_READ,
  method: 'PUT',
  path: function*() {
    return yield roleBasedPath(`notifications/read-all/`)
  }
})

const processPrivateRead = function*(action) {
  const notifications = yield select(notificationsSelector)
  yield put(
    setApiData({
      data: {
        ...notifications,
        count: notifications.count - 1,
        results: notifications.results.filter(item => item.id !== action.payload.id)
      },
      selectorKey: 'notifications'
    })
  )
  yield setStatusRead(action)
}

const processAllRead = function*(action) {
  const notifications = yield select(notificationsSelector)
  yield put(
    setApiData({
      data: {
        ...notifications,
        count: notifications.count - 1,
        results: []
      },
      selectorKey: 'notifications'
    })
  )
  yield setAllRead(action)
}

const pingToBackend = function*() {
  while (true) {
    yield put(Actions.getNotifications())
    yield delay(5000)
  }
}

const subscribeToNotification = function*() {
  const task = yield fork(pingToBackend)
  yield take(Types.UNSUBCRIBE_TO_NOTIFICATION)
  yield cancel(task)
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_NOTIFICATIONS, getNotifications)
  yield takeLatest(Types.GET_NOTIFICATION_DETAIL, getNotificationDetail)
  yield takeLatest(Types.SET_STATUS_READ, processPrivateRead)
  yield takeLatest(Types.SET_ALL_READ, processAllRead)
  yield takeLatest(Types.SUBCRIBE_TO_NOTIFICATION, subscribeToNotification)
}
