import { createAction } from 'redux-actions'
import * as Types from './types'

export const getClients = createAction(Types.GET_CLIENTS)
export const createClient = createAction(Types.CREATE_CLIENT)
export const getClientDetail = createAction(Types.GET_CLIENT_DETAIL)
export const updateClient = createAction(Types.UPDATE_CLIENT)
