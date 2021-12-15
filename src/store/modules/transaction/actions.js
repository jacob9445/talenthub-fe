import { createAction } from 'redux-actions'
import * as Types from './types'

export const getTransactions = createAction(Types.GET_TRANSACTIONS)
export const getTransactionDetail = createAction(Types.GET_TRANSACTION_DETAIL)

//for download
export const downloadTransactions = createAction(Types.DOWNLOAD_TRANSACTIONS)
export const createTransaction = createAction(Types.CREATE_TRANSACTION)
export const deleteTransaction = createAction(Types.DELETE_TRANSACTION)
export const deleteTransactionAndRefresh = createAction(Types.DELETE_TRANSACTION_AND_REFRESH)
export const updateTransaction = createAction(Types.UPDATE_TRANSACTION)
