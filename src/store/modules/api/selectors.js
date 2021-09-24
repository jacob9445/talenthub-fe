import * as R from 'ramda'
import * as types from './types'
import { prettifyMethod } from 'helpers/utils'

export const createDataSelector = (selectorKey, defaultVal = null) =>
  R.compose(R.defaultTo(defaultVal), R.compose(R.path, R.split('.'))(selectorKey), R.path(['api', 'data']))

export const createRequestStatusSelector = (selectorKey, method = 'get') =>
  R.compose(
    R.defaultTo('INIT'),
    R.prop('status'),
    R.prop(prettifyMethod(method)),
    R.compose(R.path, R.split('.'))(selectorKey),
    R.path(['api', 'requests'])
  )

export const createRequestFootprintSelector = (selectorKey, method = 'get', defaultVal = null) =>
  R.compose(
    R.defaultTo(null),
    R.prop('footprint'),
    R.prop(prettifyMethod(method)),
    R.compose(R.path, R.split('.'))(selectorKey),
    R.path(['api', 'requests'])
  )

export const isRequestNil = (selectorKey, method) =>
  R.compose(R.equals('INIT'), createRequestStatusSelector(selectorKey, method))

export const isRequestPending = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_PENDING), createRequestStatusSelector(selectorKey, method))

export const isRequestSuccess = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_SUCCESS), createRequestStatusSelector(selectorKey, method))

export const isRequestRejected = (selectorKey, method) =>
  R.compose(R.equals(types.REQUEST_REJECTED), createRequestStatusSelector(selectorKey, method))
