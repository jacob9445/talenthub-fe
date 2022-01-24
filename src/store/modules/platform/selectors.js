import { createDataSelector, isRequestPending } from '../api'

export const platformsSelector = createDataSelector('platforms')
export const platformsLoadingSelector = isRequestPending('platforms', 'GET')

export const platformDetailSelector = createDataSelector('platformDetail')
export const platformDetailLoadingSelector = isRequestPending('platformDetail', 'GET')
