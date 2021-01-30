import * as R from 'ramda'
import { handleActions } from 'redux-actions'
import * as types from './types'

const getIntialState = () => {
  const token = JSON.parse(localStorage.getItem('TH_TOKEN'))
  return Boolean(token)
}

const initialState = getIntialState()

export default handleActions(
  {
    [types.AUTH_SUCCESS]: R.always(true),
    [types.AUTH_FAIL]: R.always(false),
    [types.AUTH_LOGOUT]: R.always(false)
  },
  initialState
)
