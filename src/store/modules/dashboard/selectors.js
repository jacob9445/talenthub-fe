import * as R from 'ramda'
import { createDataSelector, isRequestPending, isRequestNil } from '../api'

export const dashbordInfoSelector = R.compose(createDataSelector('dashboard'))

export const dashboardInfoLoadingSelector = state =>
  isRequestPending('dashboard', 'GET')(state) || isRequestNil('dashboard', 'GET')(state)
