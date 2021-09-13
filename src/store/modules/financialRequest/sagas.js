import { put, takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getFinancialRequests = apiCallSaga({
  type: Types.GET_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests/')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size']
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
  },
  selectorKey: 'financialRequestDetail'
})

const createFinancialRequest = apiCallSaga({
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

const cancelFinancialRequest = apiCallSaga({
  type: Types.CANCEL_FINANCIALREQUEST,
  method: 'PUT',
  selectorKey: 'financialRequestDetail',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/cancel/`)
  }
})

const approveFinancialRequest = apiCallSaga({
  type: Types.APPROVE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/approve/`)
  },
  selectorKey: 'financialRequestDetail'
})

const declineFinancialRequest = apiCallSaga({
  type: Types.DECLINE_FINANCIALREQUEST,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/decline/`)
  },
  selectorKey: 'financialRequestDetail'
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
