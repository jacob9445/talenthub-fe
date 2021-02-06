import { createAction } from 'redux-actions'
import * as Types from './types'

export const getFinancialRequests = createAction(Types.GET_FINANCIALREQUESTS)
export const deleteFinancialRequest = createAction(Types.DELETE_FINANCIALREQUEST)
export const getFinancialRequestDetail = createAction(Types.GET_FINANCIALREQUEST_DETAIL)
export const updateFinancialRequestDetail = createAction(Types.UPDATE_FINANCIALREQUEST_DETAIL)
export const createFinancialRequest = createAction(Types.CREATE_FINANCIALREQUEST)
export const cancelFinancialRequest = createAction(Types.CANCEL_FINANCIALREQUEST)
export const approveFinancialRequest = createAction(Types.APPROVE_FINANCIALREQUEST)
export const declineFinancialRequest = createAction(Types.DECLINE_FINANCIALREQUEST)
