import * as R from 'ramda'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { REQUEST_SUCCESS, REQUEST_REJECTED, REQUEST_PENDING, SET_API_DATA, CLEAR_API_STATE } from './types'
import { prettifyMethod, getPathArray } from 'helpers/utils'

export const requests = handleActions(
  {
    [REQUEST_PENDING]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [prettifyMethod(payload.method)]: {
            status: REQUEST_PENDING
          }
        }
      }
    },

    [REQUEST_SUCCESS]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [prettifyMethod(payload.method)]: {
            status: REQUEST_SUCCESS,
            footprint: payload.footprint
          }
        }
      }
    },

    [REQUEST_REJECTED]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [prettifyMethod(payload.method)]: {
            status: REQUEST_REJECTED
          }
        }
      }
    },

    [CLEAR_API_STATE]: R.always({})
  },
  {}
)

export const data = handleActions(
  {
    [REQUEST_SUCCESS]: (state, { payload }) =>
      payload.selectorKey ? R.assocPath(getPathArray(payload.selectorKey), payload.data, state) : state,

    [SET_API_DATA]: (state, { payload }) =>
      payload.selectorKey ? R.assocPath(getPathArray(payload.selectorKey), payload.data, state) : state,

    [CLEAR_API_STATE]: R.always({}),

    [REQUEST_REJECTED]: (state, { payload }) => {
      if (prettifyMethod(payload.method) === 'get') {
        return R.dissocPath(R.split('.', payload.selectorKey), state)
      }
      return state
    }
  },
  {}
)

export default combineReducers({
  data,
  requests
})
