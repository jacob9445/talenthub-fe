import * as R from 'ramda'
import { dataSelector, isRequestPending } from '../api'

export const partnersSelector = R.compose(
  R.path(['results']),
  dataSelector('partners')
)

export const partnersLoadingSelector = state => isRequestPending('partners', 'GET')(state)

export const partnerDetailSelector = dataSelector('partnerDetail')
export const partnerDetailLoadingSelector = state => isRequestPending('partnerDetail', 'get')(state)
