import axios from 'axios'
import * as R from 'ramda'
import { call, put, select } from 'redux-saga/effects'

import { API_BASE } from '../../../config/constants'
import { requestRejected, requestPending, requestSuccess } from './actions'
import { TOKEN } from 'config/constants'
import { createDataSelector } from './selectors'
import { prettifyMethod } from 'helpers/utils'
import { createRequestFootprintSelector } from 'store/modules/api'

const defaultHeaders = request => {
  const token = localStorage.getItem(TOKEN)
  let baseHeaders = {}
  if (token) {
    baseHeaders = {
      Authorization: `JWT ${JSON.parse(token)}`
    }
  }

  let additionalHeaders = {}
  if (!R.equals(request.method, 'DELETE')) {
    additionalHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  return {
    ...baseHeaders,
    ...additionalHeaders
  }
}

const createApiCallSaga = ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  path,
  allowedParamKeys,
  defaultParams,
  headers,
  success, // Can be function generator to use yield
  fail, // Can be function generator to use yield
  payloadOnSuccess,
  payloadOnFail,
  requestSelectorKey: requestSelectorKeyOrFunc,
  selectorKey: selectorKeyOrFunc,
  footprint,
  footprintKeys
}) =>
  function*(action) {
    const payload = action.payload || {}
    const {
      data,
      params,
      useCache,
      headers: customHeaders,
      success: successCallback,
      fail: failCallback,
      pending,
      resolve,
      reject
    } = payload

    const requestSelectorKey =
      typeof requestSelectorKeyOrFunc === 'function' ? requestSelectorKeyOrFunc(payload) : requestSelectorKeyOrFunc
    const selectorKey = typeof selectorKeyOrFunc === 'function' ? selectorKeyOrFunc(payload) : selectorKeyOrFunc

    const reqFootprint = footprintKeys ? R.pick(footprintKeys, payload) : null
    if (useCache && prettifyMethod(method) === 'get') {
      const previousFootprintSelector = createRequestFootprintSelector(requestSelectorKey || selectorKey)
      const prevReqFootprint = yield select(previousFootprintSelector)
      if (R.equals(prevReqFootprint, reqFootprint)) return true

      const reqFootprintForRetrieve = footprint ? footprint(payload) : null
      if (reqFootprintForRetrieve) {
        const previousDataSelector = createDataSelector(selectorKey)
        const previousData = yield select(previousDataSelector)
        const prevResFootprint = previousData ? R.pick(R.keys(reqFootprintForRetrieve), previousData) : null
        if (R.equals(prevResFootprint, reqFootprintForRetrieve)) return true
      }
    }

    try {
      if (pending) {
        yield pending(payload)
      }

      yield put(requestPending({ selectorKey, requestSelectorKey, method }))

      const queryParams = { ...defaultParams, ...params }

      const res = yield call(axios.request, {
        url: typeof path === 'function' ? yield path(action) : path,
        method: prettifyMethod(method),
        headers: {
          ...defaultHeaders({ method }),
          ...headers,
          ...(customHeaders ? customHeaders : {})
        },
        data,
        params: allowedParamKeys ? R.pick(allowedParamKeys, queryParams) : queryParams,
        baseURL: API_BASE
      })

      const resData = payloadOnSuccess ? payloadOnSuccess(res.data, action) : res.data
      yield put(
        requestSuccess({
          footprint: reqFootprint,
          selectorKey,
          requestSelectorKey,
          method,
          type,
          data: resData
        })
      )

      if (resolve) {
        // Promise parameter
        yield resolve(resData)
      }

      if (success) {
        yield success(resData, action)
      }
      successCallback && successCallback(resData)

      return true
    } catch (err) {
      const errRes = R.path('response', err) || err
      const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes
      yield put(
        requestRejected({
          selectorKey,
          requestSelectorKey,
          method,
          data: payload
        })
      )

      if (reject) {
        // Promise parameter
        yield reject(payload)
      }

      if (fail) {
        yield fail(errRes)
      }

      failCallback && failCallback(errRes)

      return false
    }
  }

export default createApiCallSaga
