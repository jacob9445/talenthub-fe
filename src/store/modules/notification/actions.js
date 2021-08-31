import { createAction } from 'redux-actions'
import * as types from './types'

export const getNotifications = createAction(types.GET_NOTIFICATIONS)
export const getNotificationDetail = createAction(types.GET_NOTIFICATION_DETAIL)
export const setStatusRead = createAction(types.SET_STATUS_READ)
export const openNC = createAction(types.OPEN_NC)
export const closeNC = createAction(types.CLOSE_NC)
