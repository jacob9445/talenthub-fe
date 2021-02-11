import { createAction } from 'redux-actions'
import * as Types from './types'

export const getTransactions = createAction(Types.GET_TRANSACTIONS)
export const getTransactionDetail = createAction(Types.GET_TRANSACTION_DETAIL)
