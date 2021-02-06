import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getFinancialRequests = apiCallSaga({
  type: Types.GET_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests/')
  },
  selectorKey: 'financialRequests'
})

const deleteFinancialRequest = apiCallSaga({
  type: Types.DELETE_FINANCIALREQUEST,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}`)
  }
})

const getFinancialRequestDetail = apiCallSaga({
  type: Types.GET_FINANCIALREQUEST_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload}/`)
  },
  selectorKey: 'financialRequestDetail'
})

const updateFinancialRequestDetail = apiCallSaga({
  type: Types.UPDATE_FINANCIALREQUEST_DETAIL,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/`)
  }
})

const createFinancialRequest = apiCallSaga({
  type: Types.CREATE_FINANCIALREQUEST,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`financial-requests/`)
  }
})

const cancelFinancialRequest = apiCallSaga({
  type: Types.CANCEL_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/cancel/`)
  }
})

const approveFinancialRequest = apiCallSaga({
  type: Types.APPROVE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/approve/`)
  }
})

const declineFinancialRequest = apiCallSaga({
  type: Types.DECLINE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/decline/`)
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_FINANCIALREQUESTS, getFinancialRequests)
  yield takeLatest(Types.DELETE_FINANCIALREQUEST, deleteFinancialRequest)
  yield takeLatest(Types.GET_FINANCIALREQUEST_DETAIL, getFinancialRequestDetail)
  yield takeLatest(Types.UPDATE_FINANCIALREQUEST_DETAIL, updateFinancialRequestDetail)
  yield takeLatest(Types.CREATE_FINANCIALREQUEST, createFinancialRequest)
  yield takeLatest(Types.CANCEL_FINANCIALREQUEST, cancelFinancialRequest)
  yield takeLatest(Types.APPROVE_FINANCIALREQUEST, approveFinancialRequest)
  yield takeLatest(Types.DECLINE_FINANCIALREQUEST, declineFinancialRequest)
}
