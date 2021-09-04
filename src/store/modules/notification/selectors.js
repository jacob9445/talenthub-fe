import { createDataSelector } from '../api'
import * as R from 'ramda'

export const notificationsSelector = createDataSelector('notifications')
export const notificationDetailSelector = createDataSelector('notificationDetail')
export const ncOpenStatusSelector = R.path(['notification', 'isOpen'])
