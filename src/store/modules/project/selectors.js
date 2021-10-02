import { createDataSelector, isRequestPending } from '../api'

export const projectsSelector = createDataSelector('projects')
export const projectsLoadingSelector = isRequestPending('projects', 'GET')

export const projectDetailSelector = createDataSelector('projectDetail')
export const projectDetailLoadingSelector = isRequestPending('projectDetail', 'get')

export const projectsSearchResultsSelector = createDataSelector('projectsSearchResults')
export const projectsSearchResultsLodaingSelector = isRequestPending('projectsSearchResults', 'get')
