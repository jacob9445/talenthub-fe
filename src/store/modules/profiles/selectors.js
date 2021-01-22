import * as R from 'ramda'
import { dataSelector, isRequestPending } from '../api'

export const profileSelector = R.compose(
  R.path(['results']),
  dataSelector('profiles')
)

export const profileLoadingSelector = state => isRequestPending('profiles', 'GET')(state)

export const profileDetailSelector = dataSelector('profileDetail')
export const profileDetailLoadingSelector = state => isRequestPending('profileDetail', 'GET')(state)
