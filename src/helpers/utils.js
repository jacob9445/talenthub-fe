import * as R from 'ramda'
import { format } from 'date-fns'
import { PAYMENT_PLATFORM_OPTIONS, SNACKBAR_TOUCHED } from 'config/constants'

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

export const generateDecrementArray = (startValue, count) =>
  new Array(count).fill(0).reduce((acc, val, idx) => {
    acc.push(startValue - idx)
    return acc
  }, [])

export const generateIncrementArray = (startValue, count) =>
  new Array(count).fill(0).reduce((acc, val, idx) => {
    acc.push(startValue + idx)
    return acc
  }, [])

const isLeapYear = year => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true
  } else {
    return false
  }
}

export const getFirstDateOfWeek = (year, week) => {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const firstdateOfYear = new Date(year, 0, 1)
  const weekNumberOfFirstDate = format(firstdateOfYear, 'ii')
  if (isLeapYear(year)) days[1] = 29
  var period = (week - 2) * 7 + 7 - parseInt(weekNumberOfFirstDate) + 2
  var i = 0
  while (period >= days[i]) {
    period -= days[i]
    i++
  }
  const month = i + 1
  const day = period
  const firstdate = new Date(year, month - 1, day)
  return firstdate
}

export const getWeekOfMonth = date => {
  const year = format(date, 'yyyy')
  const month = format(date, 'MM')
  const week = format(date, 'ww')
  const firstDateOfMonth = new Date(year, month - 1, 1)
  const weekOfFirstDate = format(firstDateOfMonth, 'ww')
  return parseInt(week) - parseInt(weekOfFirstDate) + 1
}

export const countDelta = (oldArray, newArray) => {
  return newArray.length - oldArray.length
}

export const setSnackbarTouched = status => {
  const statusString = JSON.stringify(status)
  localStorage.setItem(SNACKBAR_TOUCHED, statusString)
}

export const getBool = R.compose(Boolean, JSON.parse, R.defaultTo('false'))

export const prettifyMethod = R.toLower()

export const getPathArray = R.split('.')

export const generateHrefFromText = data => {
  const rawLength = data.length
  const array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i++) {
    array[i] = data.charCodeAt(i)
  }
  return URL.createObjectURL(new Blob([array], { type: 'text/csv' }))
}

export const downloadFile = (url, fileName) => {
  let link = document.createElement('a')
  link.href = url
  link.download = fileName

  let event = null
  if (typeof MouseEvent === 'function') {
    event = new MouseEvent('click')
  } else {
    event = document.createEvent('MouseEvent')
    event.initEvent('click', true, true)
  }

  link.dispatchEvent(event)
}
