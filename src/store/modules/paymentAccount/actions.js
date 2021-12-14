import { createAction } from 'redux-actions'
import * as Types from './types'

export const getPaymentAccounts = createAction(Types.GET_PAYMENT_ACCOUNTS)
export const deletePaymentAccount = createAction(Types.DELETE_PAYMENT_ACCOUNT)
export const deletePaymentAccountAndRefresh = createAction(Types.DELETE_PAYMENT_ACCOUNT_AND_REFRESH)
export const getPaymentAccountDetail = createAction(Types.GET_PAYMENT_ACCOUNT_DETAIL)
export const updatePaymentAccountDetail = createAction(Types.UPDATE_PAYMENT_ACCOUNT_DETAIL)
export const createPaymentAccount = createAction(Types.CREATE_PAYMENT_ACCOUNT)
