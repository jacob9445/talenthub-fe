import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const usersSelector = R.compose(
  R.path(['results']),
  createDataSelector('users')
)

export const usersLoadingSelector = state => isRequestPending('users', 'GET')(state)

export const userDetailSelector = createDataSelector('userDetail')
export const userDetailLoadingSelector = state => isRequestPending('userDetail', 'get')(state)
