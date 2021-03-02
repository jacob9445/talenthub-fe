import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

const getTransactions = apiCallSaga({
  type: Types.GET_TRANSACTIONS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('transactions/')
  },
  selectorKey: 'transactions',
  allowedParamKeys: ['page', 'page_size']
})

const getTransactionDetail = apiCallSaga({
  type: Types.GET_TRANSACTION_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`transactions/${payload}/`)
  },
  selectorKey: 'transactionDetail'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_TRANSACTIONS, getTransactions)
  yield takeLatest(Types.GET_TRANSACTION_DETAIL, getTransactionDetail)
}
