import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const profileSelector = R.compose(
  R.path(['results']),
  createDataSelector('profiles')
)

export const profileLoadingSelector = state => isRequestPending('profiles', 'GET')(state)

export const profileDetailSelector = createDataSelector('profileDetail')
export const profileDetailLoadingSelector = state => isRequestPending('profileDetail', 'GET')(state)
