import { createAction } from 'redux-actions'
import * as Types from './types'

export const getProfiles = createAction(Types.GET_PROFILES)
export const getProfileDetail = createAction(Types.GET_PROFILE_DETAIL)
export const updateProfile = createAction(Types.UPDATE_PROFILE)