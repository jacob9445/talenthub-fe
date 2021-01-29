import fp from 'lodash/fp'

import * as types from './types'

export const createDataSelector = (selectorKey, defaultVal = null) =>
  fp.compose(
    fp.defaultTo(defaultVal),
    fp.get(selectorKey),
    fp.get('api.data')
  )

export const createRequestStatusSelector = (selectorKey, method = 'get') =>
  fp.compose(
    fp.defaultTo('INIT'),
    fp.get(method.toLowerCase()),
    fp.get(selectorKey),
    fp.get('api.requests')
  )

export const isRequestNil = (selectorKey, method) =>
  fp.compose(
    fp.isEqual('INIT'),
    createRequestStatusSelector(selectorKey, method)
  )

export const isRequestPending = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_PENDING),
    createRequestStatusSelector(selectorKey, method)
  )

export const isRequestSuccess = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_SUCCESS),
    createRequestStatusSelector(selectorKey, method)
  )

export const isRequestRejected = (selectorKey, method) =>
  fp.compose(
    fp.isEqual(types.REQUEST_REJECTED),
    createRequestStatusSelector(selectorKey, method)
  )
