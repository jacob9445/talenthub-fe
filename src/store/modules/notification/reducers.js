import { handleActions } from 'redux-actions'
import * as Types from './types'
const initialState = {
  isOpen: false
}

export default handleActions(
  {
    [Types.OPEN_NC]: state => ({
      ...state,
      isOpen: true
    }),
    [Types.CLOSE_NC]: state => ({
      ...state,
      isOpen: false
    })
  },
  initialState
)
