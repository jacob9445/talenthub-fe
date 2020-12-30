import * as R from 'ramda'
import { dataSelector } from '../api'
export const isAuthenticatedSelector = R.path(['isAuthenticated'])
export const meSelector = dataSelector('profile')
