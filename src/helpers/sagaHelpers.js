import { select } from 'redux-saga/effects'
import { roleSelector } from 'store/modules/auth'
import { ROLES, URL_PREFIXES } from 'config/constants'

export const roleBasedPath = function*(path) {
  const role = yield select(roleSelector)
  const prefix = URL_PREFIXES[role] || URL_PREFIXES[ROLES.DEVELOPER]
  return `api/${prefix}/${path}`
}
