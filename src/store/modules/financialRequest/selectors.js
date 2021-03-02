import { createDataSelector, isRequestPending } from '../api'

export const financialRequestsSelector = createDataSelector('financialRequests')
export const financialRequestsLoadingSelector = state => isRequestPending('financialRequests', 'GET')(state)

export const financialRequestDetailSelector = createDataSelector('financialRequestDetail')
export const financialRequestDetailLoadingSelector = state => isRequestPending('financialRequestDetail', 'get')(state)
