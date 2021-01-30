import * as R from 'ramda'
import { createDataSelector, isRequestPending, isRequestNil, isRequestRejected } from '../api'
export const isAuthenticatedSelector = R.path(['isAuthenticated'])
export const meSelector = createDataSelector('me')
export const roleSelector = createDataSelector('me.role')
export const meLoadingSelector = state => isRequestPending('me', 'get')(state) || isRequestNil('me', 'get')(state)

export const meRejectedSelector = isRequestRejected('me', 'get')
