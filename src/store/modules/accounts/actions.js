import { createAction } from 'redux-actions'
import * as Types from './types'

export const getAccounts = createAction(Types.GET_ACCOUNTS)
export const deleteAccount = createAction(Types.DELETE_ACCOUNT)
export const deleteAccountAndRefresh = createAction(Types.DELETE_ACCOUNT_AND_REFRESH)
export const getAccountDetail = createAction(Types.GET_ACCOUNTDETAIL)