import * as R from 'ramda'
import { PAYMENT_PLATFORM_OPTIONS } from 'config/constants'

export const getPlatformLabel = paymentPlatform =>
  R.compose(
    R.defaultTo(paymentPlatform),
    R.path(['display']),
    R.find(item => item.value === paymentPlatform)
  )(PAYMENT_PLATFORM_OPTIONS)

export const getFullName = user => (user ? [user.first_name, user.last_name].join(' ') : '')
