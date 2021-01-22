import * as R from 'ramda'
import { dataSelector, isRequestPending } from '../api'

export const clientsSelector = R.compose(
  R.path(['results']),
  dataSelector('clients')
)
export const clientsLoadingSelector = state => isRequestPending('clients', 'GET')(state)
export const clientDetailSelector = dataSelector('clientDetail')
export const clientDetailLoadingSelector = state => isRequestPending('clientDetail', 'GET')(state)
