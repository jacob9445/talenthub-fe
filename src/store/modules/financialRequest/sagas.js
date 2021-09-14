import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getAllFinancialRequests = createApiCallSaga({
  type: Types.GET_ALL_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests?ordering=-requested_at')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
})

const getPendingFinancialRequests = createApiCallSaga({
  type: Types.GET_PENDING_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests?status=1&ordering=requested_at')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
})

const getApprovedFinancialRequests = createApiCallSaga({
  type: Types.GET_APPROVED_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests?status=2&ordering=-requested_at')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
})

const getDeclinedFinancialRequests = createApiCallSaga({
  type: Types.GET_DECLINED_FINALCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests?status=3&ordering=-requested_at')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
})

const getCanceledFinancialRequests = createApiCallSaga({
  type: Types.GET_CANCELED_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests?status=4&ordering=-requested_at')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
})

const deleteFinancialRequest = createApiCallSaga({
  type: Types.DELETE_FINANCIALREQUEST,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}`)
  }
})

const getFinancialRequestDetail = createApiCallSaga({
  type: Types.GET_FINANCIALREQUEST_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload}/`)
  },
  selectorKey: 'financialRequestDetail'
})

const updateFinancialRequestDetail = createApiCallSaga({
  type: Types.UPDATE_FINANCIALREQUEST_DETAIL,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/`)
  },
  selectorKey: 'financialRequestDetail'
})

const createFinancialRequest = createApiCallSaga({
  type: Types.CREATE_FINANCIALREQUEST,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`financial-requests/`)
  },
  selectorKey: 'financialRequestDetail',
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Your financial request created successfully!'
      })
    )
  }
})

const cancelFinancialRequest = createApiCallSaga({
  type: Types.CANCEL_FINANCIALREQUEST,
  method: 'PUT',
  selectorKey: 'financialRequestDetail',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/cancel/`)
  }
})

const approveFinancialRequest = createApiCallSaga({
  type: Types.APPROVE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/approve/`)
  },
  selectorKey: 'financialRequestDetail'
})

const declineFinancialRequest = createApiCallSaga({
  type: Types.DECLINE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/decline/`)
  },
  selectorKey: 'financialRequestDetail'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_ALL_FINANCIALREQUESTS, getAllFinancialRequests)
  yield takeLatest(Types.GET_PENDING_FINANCIALREQUESTS, getPendingFinancialRequests)
  yield takeLatest(Types.GET_APPROVED_FINANCIALREQUESTS, getApprovedFinancialRequests)
  yield takeLatest(Types.GET_DECLINED_FINALCIALREQUESTS, getDeclinedFinancialRequests)
  yield takeLatest(Types.GET_CANCELED_FINANCIALREQUESTS, getCanceledFinancialRequests)
  yield takeLatest(Types.DELETE_FINANCIALREQUEST, deleteFinancialRequest)
  yield takeLatest(Types.GET_FINANCIALREQUEST_DETAIL, getFinancialRequestDetail)
  yield takeLatest(Types.UPDATE_FINANCIALREQUEST_DETAIL, updateFinancialRequestDetail)
  yield takeLatest(Types.CREATE_FINANCIALREQUEST, createFinancialRequest)
  yield takeLatest(Types.CANCEL_FINANCIALREQUEST, cancelFinancialRequest)
  yield takeLatest(Types.APPROVE_FINANCIALREQUEST, approveFinancialRequest)
  yield takeLatest(Types.DECLINE_FINANCIALREQUEST, declineFinancialRequest)
}
