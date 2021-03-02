import { createDataSelector, isRequestPending } from '../api'

export const clientsSelector = createDataSelector('clients')
export const clientsLoadingSelector = state => isRequestPending('clients', 'GET')(state)
export const clientDetailSelector = createDataSelector('clientDetail')
export const clientDetailLoadingSelector = state => isRequestPending('clientDetail', 'GET')(state)
