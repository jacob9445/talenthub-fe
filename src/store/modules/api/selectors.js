import * as R from 'ramda'
import * as types from './types'

export const createDataSelector = (selectorKey, defaultVal = null) =>
  R.compose(R.defaultTo(defaultVal), R.prop(selectorKey), R.path(['api', 'data']))

export const createRequestStatusSelector = (selectorKey, method = 'get') =>
  R.compose(R.defaultTo('INIT'), R.prop(method.toLowerCase()), R.prop(selectorKey), R.path(['api', 'requests']))

export const isRequestNil = (selectorKey, method) =>
  R.compose(R.equals('INIT'), createRequestStatusSelector(selectorKey, method))

export const isRequestPending = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_PENDING), createRequestStatusSelector(selectorKey, method))

export const isRequestSuccess = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_SUCCESS), createRequestStatusSelector(selectorKey, method))

export const isRequestRejected = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_REJECTED), createRequestStatusSelector(selectorKey, method))
