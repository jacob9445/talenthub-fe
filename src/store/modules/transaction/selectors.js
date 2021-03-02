import { createDataSelector, isRequestPending } from '../api'

export const transactionsSelector = createDataSelector('transactions')
export const transactionsLoadingSelector = state => isRequestPending('transactions', 'GET')(state)

export const transactionDetailSelector = createDataSelector('transactionDetail')
export const transactionDetailLoadingSelector = state => isRequestPending('transactionDetail', 'get')(state)
