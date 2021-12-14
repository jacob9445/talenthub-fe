import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { showMessage } from '../message'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'

const getPaymentAccounts = createApiCallSaga({
  type: Types.GET_PAYMENT_ACCOUNTS,
  method: 'GET',
  path: function*() {
    console.log(yield roleBasedPath('payment-accounts/'))
    return yield roleBasedPath('payment-accounts/')
  },
  selectorKey: 'paymentAccounts',
  allowedParamKeys: ['page', 'page_size']
})

const deletePaymentAccount = createApiCallSaga({
  type: Types.DELETE_PAYMENT_ACCOUNT,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`payment-accounts/${payload.id}/`)
  }
})

const deletePaymentAccountAndRefresh = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) {
    yield deletePaymentAccount(action)
    yield getPaymentAccounts(action)
  }
}

const getPaymentAccountDetail = createApiCallSaga({
  type: Types.GET_PAYMENT_ACCOUNT_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`payment-accounts/${payload}/`)
  },
  selectorKey: 'paymentAccountDetail'
})

const updatePaymentAccountDetail = createApiCallSaga({
  type: Types.UPDATE_PAYMENT_ACCOUNT_DETAIL,
  method: 'PATCH',
  path: function*({ payload }) {
    return yield roleBasedPath(`payment-accounts/${payload.id}/`)
  },
  selectorKey: 'paymentAccountDetail'
})

const createPaymentAccount = createApiCallSaga({
  type: Types.CREATE_PAYMENT_ACCOUNT,
  method: 'POST',
  path: function*({ payload }) {
    return yield roleBasedPath(`payment-accounts/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'PaymentAccount created successfully!'
      })
    )
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PAYMENT_ACCOUNTS, getPaymentAccounts)
  yield takeLatest(Types.DELETE_PAYMENT_ACCOUNT, deletePaymentAccount)
  yield takeLatest(Types.DELETE_PAYMENT_ACCOUNT_AND_REFRESH, deletePaymentAccountAndRefresh)
  yield takeLatest(Types.GET_PAYMENT_ACCOUNT_DETAIL, getPaymentAccountDetail)
  yield takeLatest(Types.UPDATE_PAYMENT_ACCOUNT_DETAIL, updatePaymentAccountDetail)
  yield takeLatest(Types.CREATE_PAYMENT_ACCOUNT, createPaymentAccount)
}
