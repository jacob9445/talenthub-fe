import { select } from 'redux-saga/effects'
import { roleSelector } from 'store/modules/auth'
import { ROLES } from 'config/constants'

export const roleBasedPath = function*(path) {
  const role = yield select(roleSelector)
  if (role === ROLES.ADMIN) return `api/admin/${path}`
  else if (role === ROLES.TEAM_MANAGER) return `api/team-manager/${path}`
  else return `api/developer/${path}`
}
