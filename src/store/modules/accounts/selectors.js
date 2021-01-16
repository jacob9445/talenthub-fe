import * as R from 'ramda'
import { dataSelector, isRequestPending } from '../api'

export const accountsSelector = R.compose(
  R.path(['results']),
  dataSelector('accounts')
)

export const accountsLoadingSelector = (state) => 
  isRequestPending('accounts', 'GET')(state)
