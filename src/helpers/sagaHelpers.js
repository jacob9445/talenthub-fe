import { select, take, put, race, call } from 'redux-saga/effects'
import { show } from 'redux-modal'
import { bindCallbackToPromise } from './utils'
import { roleSelector } from 'store/modules/auth'
import { ROLES, URL_PREFIXES } from 'config/constants'
import { REQUEST_SUCCESS, REQUEST_REJECTED } from 'store/modules/api/types'

export const roleBasedPath = function*(path) {
  const role = yield select(roleSelector)
  const prefix = URL_PREFIXES[role] || URL_PREFIXES[ROLES.DEVELOPER]
  return `api/${prefix}/${path}`
}

export const takeApiResult = function*(selectorKey) {
  let nAction
  do {
    nAction = yield take([REQUEST_SUCCESS, REQUEST_REJECTED])
  } while (nAction.payload.selectorKey !== selectorKey)
  return nAction
}

export const confirm = function*(message) {
  const confirmProm = bindCallbackToPromise()
  const cancelProm = bindCallbackToPromise()
  yield put(
    show('confirmModal', {
      confirmation: message,
      proceed: confirmProm.cb,
      cancel: cancelProm.cb
    })
  )
  const result = yield race({
    confirmed: call(confirmProm.promise),
    canceled: call(cancelProm.promise)
  })
  return Object.keys(result).includes('confirmed') ? true : false
}
