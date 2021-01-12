import { createAction } from 'redux-actions'
import * as Types from './types'

export const getUsers = createAction(Types.USERS_GETUSERS)
export const deleteUser = createAction(Types.USERS_DELETEUSER)
export const deleteUserAndRefresh = createAction(Types.USERS_DELETE_USER_AND_REFRESH)
export const getCertainUser = createAction(Types.GET_CERTAIN_USER)
export const updateCertainUser = createAction(Types.UPDATE_CERTAIN_USER)
export const createUser = createAction(Types.CREATE_USER)
