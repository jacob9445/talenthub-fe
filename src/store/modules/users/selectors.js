import * as R from 'ramda'
import { dataSelector, isRequestPending} from '../api'

export const usersSelector = R.compose(
  R.path(['results']),
  dataSelector('users')
)

export const usersLoadingSelector = (state) => 
  isRequestPending('users', 'GET')(state)
  
export const userDetailSelector = dataSelector('userDetail')
export const userDetailLoadingSelector = (state) => 
  isRequestPending('userDetail', 'get')(state)