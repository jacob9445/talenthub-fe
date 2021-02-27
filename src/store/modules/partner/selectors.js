import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const partnersSelector = createDataSelector('partners')
export const partnersLoadingSelector = state => isRequestPending('partners', 'GET')(state)

export const partnerDetailSelector = createDataSelector('partnerDetail')
export const partnerDetailLoadingSelector = state => isRequestPending('partnerDetail', 'get')(state)
