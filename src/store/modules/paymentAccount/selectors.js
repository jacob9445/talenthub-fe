import { createDataSelector, isRequestPending } from '../api'

export const paymentAccountsSelector = createDataSelector('paymentAccounts')
export const paymentAccountsLoadingSelector = isRequestPending('paymentAccounts', 'GET')

export const paymentAccountDetailSelector = createDataSelector('paymentAccountDetail')
export const paymentAccountDetailLoadingSelector = isRequestPending('paymentAccountDetail', 'GET')
