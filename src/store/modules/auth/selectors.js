import * as R from 'ramda'
import { dataSelector, isRequestPending, isRequestNil, isRequestRejected } from '../api'
export const isAuthenticatedSelector = R.path(['isAuthenticated'])
export const meSelector = dataSelector('me') 
export const meLoadingSelector = (state) =>
  isRequestPending('me', 'get')(state) || isRequestNil('me', 'get')(state)

export const meRejectedSelector = isRequestRejected('me', 'get')