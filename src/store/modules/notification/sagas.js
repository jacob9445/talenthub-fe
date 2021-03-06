import { select, takeLatest, take, delay, cancel, fork, put } from 'redux-saga/effects'
import { createApiCallSaga, setApiData } from '../api'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { notificationsSelector, notificationPermissionSelector } from './selectors'
import { NOTIFICATION_PING_DELAY, NOTIFICATION_IDS } from 'config/constants'
import { showMessage } from '../message'
import * as Types from './types'
import * as actions from './actions'
import { countDelta, setSnackbarTouched, getBool } from 'helpers/utils'
import { SNACKBAR_TOUCHED } from 'config/constants'

const getNotifications = createApiCallSaga({
  type: Types.GET_NOTIFICATIONS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('notifications/')
  },
  selectorKey: 'notifications'
})

const getNotificationDetail = createApiCallSaga({
  type: Types.GET_NOTIFICATION_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`notifications/${payload.id}/`)
  },
  selectorKey: 'notificationDetail'
})

const setStatusRead = createApiCallSaga({
  type: Types.SET_STATUS_READ,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`notifications/${payload.id}/read/`)
  }
})

const setAllRead = createApiCallSaga({
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
        count: 0,
        results: []
      },
      selectorKey: 'notifications'
    })
  )
  yield setAllRead(action)
}

const pingToBackend = function*() {
  while (true) {
    yield put(actions.getNotifications())
    const notifications = yield select(notificationsSelector)
    const notificationEnabled = yield select(notificationPermissionSelector)
    if (!notificationEnabled && Notification.permission === 'granted') {
      yield put(actions.notificationEnabled())
    }
    if (notifications) {
      var notificationIDs = []
      notificationIDs = notifications.results.map(notification => notification.id)
      notificationIDs.sort()
      const oldNotificationIDs = JSON.parse(localStorage.getItem(NOTIFICATION_IDS)) || []
      const delta = countDelta(oldNotificationIDs, notificationIDs)
      const touched = getBool(localStorage.getItem(SNACKBAR_TOUCHED))
      if (delta !== 0) {
        localStorage.setItem(NOTIFICATION_IDS, JSON.stringify(notificationIDs))
        setSnackbarTouched(false)
      }
      if (delta > 0 && touched === false) {
        if (notificationEnabled) new Notification(`You have ${notifications.count} new notifications from Talents Hub`)
        yield put(
          showMessage({
            message: `You have ${notifications.count} new notifications`,
            variant: 'info',
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            },
            actionOnClick: actions.openNC()
          })
        )
      }
    }

    yield delay(NOTIFICATION_PING_DELAY)
  }
}

const subscribeToNotifications = function*() {
  const task = yield fork(pingToBackend)
  yield take(Types.UNSUBSCRIBE_FROM_NOTIFICATIONS)
  yield cancel(task)
}

const getNotificationPermission = function*() {
  if (Notification.permission === 'default') Notification.requestPermission()
  else if (Notification.permission === 'granted') yield put(actions.notificationEnabled())
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_NOTIFICATIONS, getNotifications)
  yield takeLatest(Types.GET_NOTIFICATION_DETAIL, getNotificationDetail)
  yield takeLatest(Types.SET_STATUS_READ, processPrivateRead)
  yield takeLatest(Types.SET_ALL_READ, processAllRead)
  yield takeLatest(Types.SUBSCRIBE_TO_NOTIFICATIONS, subscribeToNotifications)
  yield takeLatest(Types.GET_NOTIFICATION_PERMISSION, getNotificationPermission)
}
