import { handleActions } from 'redux-actions'
import { REQUEST_SUCCESS, REQUEST_REJECTED} from '../api'
import { AUTH_LOGIN, AUTH_SIGNUP, AUTH_LOGOUT} from './types'

const getIntialState = () => {

  const auth = JSON.parse(localStorage.getItem('authentication'))
  return auth ? { profile: auth.info} : { profile: null}
}

const initialState = getIntialState()

export default handleActions({
  [REQUEST_SUCCESS]: (state, {payload}) => {
    if( payload.type === AUTH_LOGIN) {
      return {
        ...state,
        profile: payload.data.info
      }
    } else if(payload.type === AUTH_SIGNUP) {
      return {
        ...state,
        profile: null
      }
    }
  },
  [REQUEST_REJECTED] : (state, {payload}) => {
    return {
      ...state,
      profile: null
    }
  },
  [AUTH_LOGOUT] : (state) => {
    return {
      ...state,
      profile: null
    }
  }
}, initialState)
