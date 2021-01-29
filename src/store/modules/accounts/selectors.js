import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const accountsSelector = R.compose(
  R.path(['results']),
  createDataSelector('accounts')
)
export const accountsLoadingSelector = state => isRequestPending('accounts', 'GET')(state)
export const accountDetailSelector = createDataSelector('accountDetail')
export const accountDetailLoadingSelector = state => isRequestPending('accountDetail', 'GET')(state)
