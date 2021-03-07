import { path } from 'ramda'

import { authLogout } from 'store/modules/auth'
import { REQUEST_REJECTED } from 'store/modules/api'

const authMiddleware = store => next => action => {
  if (action.type === REQUEST_REJECTED) {
    const status = path(['payload', 'data', 'response', 'status'], action)
    if (status === 401 || status === 403) {
      store.dispatch(authLogout())
      return
    }
  }

  return next(action)
}

export default authMiddleware
