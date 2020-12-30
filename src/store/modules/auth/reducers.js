import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import { REQUEST_SUCCESS, REQUEST_REJECTED} from '../api'
import { AUTH_LOGOUT } from './types'

const getIntialState = () => {
  const token = JSON.parse(localStorage.getItem('TH_TOKEN'))
  return Boolean(token)
}

const initialState = getIntialState()

export default handleActions({
  [REQUEST_SUCCESS]: R.always(true),
  [REQUEST_REJECTED]: R.always(false),
  [AUTH_LOGOUT]: R.always(false)
}, initialState)
