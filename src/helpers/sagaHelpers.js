import { select, take } from 'redux-saga/effects'
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
