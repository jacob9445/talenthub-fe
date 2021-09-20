import { createDataSelector, isRequestPending } from '../api'

export const usersSelector = createDataSelector('users')

export const usersLoadingSelector = state => isRequestPending('users', 'GET')(state)

export const userDetailSelector = createDataSelector('userDetail')
export const userDetailLoadingSelector = state => isRequestPending('userDetail', 'get')(state)
export const unassignedUsersSelector = createDataSelector('unassignedUsers')
export const userSearchResultsSelector = createDataSelector('userSearchResults', [])
