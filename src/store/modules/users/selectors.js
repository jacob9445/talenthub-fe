import * as R from 'ramda'
import { dataSelector, isRequestNil, isRequestPending} from '../api'

export const usersSelector = R.compose(
  R.path(['results']),
  dataSelector('users')
)

export const certainUserSelector = dataSelector('certain_user')
export const certainUserLoadingSelector = (state) => 
  isRequestPending('certain_user', 'get')(state) || isRequestNil('certain_user', 'get')(state)