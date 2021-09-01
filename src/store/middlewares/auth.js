import { path } from 'ramda'

import { authLogout } from 'store/modules/auth'
import { REQUEST_REJECTED } from 'store/modules/api'
import { API_AUTH_GET_URL } from 'config/constants'

const authMiddleware = store => next => action => {
  if (action.type === REQUEST_REJECTED) {
    const status = path(['payload', 'data', 'response', 'status'], action)
    const url = path(['payload', 'data', 'config', 'url'], action)

    if (status === 401 || status === 403 || url === API_AUTH_GET_URL) {
      store.dispatch(authLogout())
      return
    }
  }

  return next(action)
}

export default authMiddleware
