import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const financialRequestsSelector = R.compose(
  R.path(['results']),
  createDataSelector('financialRequests')
)

export const financialRequestsLoadingSelector = state => isRequestPending('financialRequests', 'GET')(state)

export const financialRequestDetailSelector = createDataSelector('financialRequestDetail')
export const financialRequestDetailLoadingSelector = state => isRequestPending('financialRequestDetail', 'get')(state)
