import * as R from 'ramda'
import { dataSelector, isRequestPending} from '../api'

export const usersSelector = R.compose(
  R.path(['results']),
  dataSelector('users')
)

export const usersLoadingSelector = (state) => 
  isRequestPending('users', 'GET')(state)
  
export const certainUserSelector = dataSelector('certain_user')
export const certainUserLoadingSelector = (state) => 
  isRequestPending('certain_user', 'get')(state)