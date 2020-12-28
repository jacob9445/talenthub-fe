import { createAction } from 'redux-actions'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT, AUTH_GETPROFILE, AUTH_SAVEPROFILE} from './types'

export const authLogin = createAction(AUTH_LOGIN)
export const authSignup = createAction(AUTH_SIGNUP)
export const authLogout = createAction(AUTH_LOGOUT, () => {
  localStorage.removeItem('authentication')
})
export const authGetProfile = createAction(AUTH_GETPROFILE)
export const authSaveProfile = createAction(AUTH_SAVEPROFILE)