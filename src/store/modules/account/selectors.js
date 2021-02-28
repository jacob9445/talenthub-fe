import { createDataSelector, isRequestPending } from '../api'

export const accountsSelector = createDataSelector('accounts')
export const accountsLoadingSelector = state => isRequestPending('accounts', 'GET')(state)
export const accountDetailSelector = createDataSelector('accountDetail')
export const accountDetailLoadingSelector = state => isRequestPending('accountDetail', 'GET')(state)
