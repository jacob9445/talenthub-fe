import * as R from 'ramda'
import { dataSelector, isRequestPending } from '../api'

export const clientsSelector = R.compose(
  R.path(['results']),
  dataSelector('clients')
)

export const clientsLoadingSelector = (state) => 
  isRequestPending('clients', 'GET')(state)

