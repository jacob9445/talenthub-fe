import { handleActions } from 'redux-actions'
import * as Types from './types'

const initialState = {
  state: null,
  options: {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    autoHideDuration: 6000,
    message: 'Hi',
    variant: null
  }
}

export default handleActions(
  {
    [Types.HIDE_MESSAGE]: state => ({
      ...state,
      state: null
    }),
    [Types.SHOW_MESSAGE]: (state, { payload }) => ({
      state: true,
      options: {
        ...initialState.options,
        ...payload
      }
    })
  },
  initialState
)
