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

export const truncateText = text => {
  if (text.length > 50) {
    return text.slice(0, 50) + '...'
  } else return text
}

export const fromMsgStrToArray = str => {
  const splitters = ['{{', '}}']
  let splitterIdx = 0
  let ary = [],
    startPos = 0
  let foundPos = str.indexOf(splitters[splitterIdx], startPos)
  while (foundPos !== -1) {
    if (splitterIdx > 0) {
      foundPos += 2
    }
    ary.push(str.slice(startPos, foundPos))
    startPos = foundPos
    splitterIdx = (splitterIdx + 1) % splitters.length
    foundPos = str.indexOf(splitters[splitterIdx], startPos)
  }
  ary.push(str.slice(startPos))
  return ary
}
