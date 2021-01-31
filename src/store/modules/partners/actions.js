import { createAction } from 'redux-actions'
import * as Types from './types'

export const getPartners = createAction(Types.GET_PARTNERS)
export const deletePartner = createAction(Types.DELETE_PARTNER)
export const deletePartnerAndRefresh = createAction(Types.DELETE_PARTNER_AND_REFRESH)
export const getPartnerDetail = createAction(Types.GET_PARTNER_DETAIL)
export const updatePartnerDetail = createAction(Types.UPDATE_PARTNER_DETAIL)
export const createPartner = createAction(Types.CREATE_PARTNER)
