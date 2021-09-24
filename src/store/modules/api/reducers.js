import unset from 'lodash/unset'
import * as R from 'ramda'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { REQUEST_SUCCESS, REQUEST_REJECTED, REQUEST_PENDING, SET_API_DATA, CLEAR_API_STATE } from './types'

export const requests = handleActions(
  {
    [REQUEST_PENDING]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [R.toLower(payload.method)]: REQUEST_PENDING
        }
      }
    },

    [REQUEST_SUCCESS]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [R.toLower(payload.method)]: REQUEST_SUCCESS
        }
      }
    },

    [REQUEST_REJECTED]: (state, { payload }) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [R.toLower(payload.method)]: REQUEST_REJECTED
        }
      }
    },

    [CLEAR_API_STATE]: R.always({})
  },
  {}
)

const deepSetWith = (state, path, data) => {
  if (!path) return data
  const pathArray = path.split('.')
  const [firstKey, ...remaining] = pathArray

  return {
    ...state,
    [firstKey]: deepSetWith(state[firstKey], remaining.join('.'), data)
  }
}

export const data = handleActions(
  {
    [REQUEST_SUCCESS]: (state, { payload }) => {
      return deepSetWith(state, payload.selectorKey, payload.data)
    },

    [SET_API_DATA]: (state, { payload }) => {
      return deepSetWith(state, payload.selectorKey, payload.data)
    },

    [CLEAR_API_STATE]: R.always({}),

    [REQUEST_REJECTED]: (state, { payload }) => {
      if (payload.method.toLowerCase() === 'get') {
        unset(state, payload.selectorKey)
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
