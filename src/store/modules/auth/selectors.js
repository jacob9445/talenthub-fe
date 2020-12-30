import * as R from 'ramda'
import { dataSelector, isRequestPending, isRequestNil, isRequestRejected } from '../api'
export const isAuthenticatedSelector = R.path(['isAuthenticated'])
export const meSelector = dataSelector('me') 
export const meIsLoadingSelector = R.or(isRequestPending('me', 'get'), isRequestNil('me', 'get'))
export const meRejectedSelector = isRequestRejected('me', 'get')