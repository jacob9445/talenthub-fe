import { createAction } from 'redux-actions'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT, AUTH_GETME, AUTH_FAIL, AUTH_SUCCESS, AUTH_UPDATEME } from './types'

export const authLogin = createAction(AUTH_LOGIN)
export const authSignup = createAction(AUTH_SIGNUP)
export const authLogout = createAction(AUTH_LOGOUT)
export const authGetMe = createAction(AUTH_GETME)
export const authUpdateMe = createAction(AUTH_UPDATEME)
export const authFail = createAction(AUTH_FAIL)
export const authSuccess = createAction(AUTH_SUCCESS)
