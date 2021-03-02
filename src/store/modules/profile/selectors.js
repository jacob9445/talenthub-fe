import { createDataSelector, isRequestPending } from '../api'

export const profileSelector = createDataSelector('profiles')
export const profileLoadingSelector = state => isRequestPending('profiles', 'GET')(state)

export const profileDetailSelector = createDataSelector('profileDetail')
export const profileDetailLoadingSelector = state => isRequestPending('profileDetail', 'GET')(state)
