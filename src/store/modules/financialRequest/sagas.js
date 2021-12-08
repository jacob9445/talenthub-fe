import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getFinancialRequests = createApiCallSaga({
  type: Types.GET_FINANCIALREQUESTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('financial-requests/')
  },
  selectorKey: 'financialRequests',
  allowedParamKeys: ['page', 'page_size', 'status', 'ordering']
})

const deleteFinancialRequest = createApiCallSaga({
  type: Types.DELETE_FINANCIALREQUEST,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`financial-requests/${payload.id}/`)
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

const confirmDeclineFinancialRequest = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) yield declineFinancialRequest(action)
}

const confirmCancelFinancialRequest = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) yield cancelFinancialRequest(action)
}
export default function* rootSaga() {
  yield takeLatest(Types.GET_FINANCIALREQUESTS, getFinancialRequests)
  yield takeLatest(Types.DELETE_FINANCIALREQUEST, deleteFinancialRequest)
  yield takeLatest(Types.GET_FINANCIALREQUEST_DETAIL, getFinancialRequestDetail)
  yield takeLatest(Types.UPDATE_FINANCIALREQUEST_DETAIL, updateFinancialRequestDetail)
  yield takeLatest(Types.CREATE_FINANCIALREQUEST, createFinancialRequest)
  yield takeLatest(Types.CONFIRM_CANCEL_FINANCIALREQUEST, confirmCancelFinancialRequest)
  yield takeLatest(Types.APPROVE_FINANCIALREQUEST, approveFinancialRequest)
  yield takeLatest(Types.CONFIRM_DECLINE_FINANCIALREQUEST, confirmDeclineFinancialRequest)
}
