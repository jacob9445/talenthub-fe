import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const transactionsSelector = R.compose(
  R.path(['results']),
  createDataSelector('transactions')
)

export const transactionsLoadingSelector = state => isRequestPending('transactions', 'GET')(state)

export const transactionDetailSelector = createDataSelector('transactionDetail')
export const transactionDetailLoadingSelector = state => isRequestPending('transactionDetail', 'get')(state)
