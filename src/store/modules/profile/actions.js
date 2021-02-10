import { createAction } from 'redux-actions'
import * as Types from './types'

export const getProfiles = createAction(Types.GET_PROFILES)
export const getProfileDetail = createAction(Types.GET_PROFILE_DETAIL)
export const updateProfile = createAction(Types.UPDATE_PROFILE)
export const deleteProfile = createAction(Types.DELETE_PROFILE)
export const deleteProfileAndRefresh = createAction(Types.DELETE_PROFILE_AND_REFRESH)
