import { createAction } from 'redux-actions'
import * as types from './types'

export const getNotifications = createAction(types.GET_NOTIFICATIONS)
export const getNotificationDetail = createAction(types.GET_NOTIFICATION_DETAIL)
export const setStatusRead = createAction(types.SET_STATUS_READ)
export const setAllRead = createAction(types.SET_ALL_READ)
export const openNC = createAction(types.OPEN_NC)
export const closeNC = createAction(types.CLOSE_NC)
export const subscribeToNotifications = createAction(types.SUBSCRIBE_TO_NOTIFICATIONS)
export const unsubscribeFromNotifications = createAction(types.UNSUBSCRIBE_FROM_NOTIFICATIONS)
export const getNotificationPermission = createAction(types.GET_NOTIFICATION_PERMISSION)
export const notificationEnabled = createAction(types.NOTIFICATION_ENABLED)
