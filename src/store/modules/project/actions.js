import { createAction } from 'redux-actions'
import * as Types from './types'

export const getProjects = createAction(Types.GET_PROJECTS)
export const deleteProject = createAction(Types.DELETE_PROJECT)
export const deleteProjectAndRefresh = createAction(Types.DELETE_PROJECT_AND_REFRESH)
export const getProjectDetail = createAction(Types.GET_PROJECT_DETAIL)
export const updateProjectDetail = createAction(Types.UPDATE_PROJECT_DETAIL)
export const createProject = createAction(Types.CREATE_PROJECT)
export const searchProjects = createAction(Types.SEARCH_PROJECTS)
