import { createAction } from 'redux-actions'
import * as Types from './types'

export const getClients = createAction(Types.GET_CLIENTS)
export const createClient = createAction(Types.CREATE_CLIENT)