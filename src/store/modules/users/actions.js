import { createAction } from 'redux-actions'
import * as Types from './types'

export const getUsers = createAction(Types.USERS_GETUSERS)
export const deleteUser = createAction(Types.USERS_DELETEUSER)
export const deleteUserAndRefresh = createAction(Types.USERS_DELETE_USER_AND_REFRESH)
export const getUserDetail = createAction(Types.GET_USER_DETAIL)
export const updateUserDetail = createAction(Types.UPDATE_USER_DETAIL)
export const createUser = createAction(Types.CREATE_USER)
