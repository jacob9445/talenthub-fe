import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const dashbordInfoSelector = R.compose(createDataSelector('dashboard'))

export const dashboardInfoLoadingSelector = state => isRequestPending('dashboard', 'GET')(state)
