import { createAction } from 'redux-actions'
import * as Types from './types'

export const getPlatforms = createAction(Types.GET_PLATFORMS)
export const deletePlatform = createAction(Types.DELETE_PLATFORM)
export const deletePlatformAndRefresh = createAction(Types.DELETE_PLATFORM_AND_REFRESH)
export const getPlatformDetail = createAction(Types.GET_PLATFORM_DETAIL)
export const updatePlatform = createAction(Types.UPDATE_PLATFORM)
export const createPlatform = createAction(Types.CREATE_PLATFORM)
