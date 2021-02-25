import * as R from 'ramda'
import { PAYMENT_PLATFORM_OPTIONS } from 'config/constants'

export const getPlatformLabel = paymentPlatform =>
  R.compose(
    R.defaultTo(paymentPlatform),
    R.path(['display']),
    R.find(item => item.value === paymentPlatform)
  )(PAYMENT_PLATFORM_OPTIONS)

export const getFullName = user => (user ? [user.first_name, user.last_name].join(' ') : '')

export const parseQueryString = R.compose(
  R.reduce(
    (total, value) => ({
      ...total,
      [value[0]]: value[1]
    }),
    {}
  ),
  R.map(R.split('=')),
  R.split('&'),
  R.replace('?', '')
)

export const jsonToQueryString = obj => {
  const pairs = []
  obj &&
    Object.keys(obj).forEach(key => {
      if (obj[key]) {
        const value = encodeURIComponent(obj[key])
        value && pairs.push(`${key}=${value}`)
      }
    })

  return pairs.length ? `?${pairs.join('&')}` : ''
}

export const getPageCount = ({ page_size }, count) => Math.ceil(count / page_size)
