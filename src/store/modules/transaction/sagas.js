import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'
import { downloadFile, generateHrefFromText } from 'helpers/utils'
import { showMessage } from '../message'

const getTransactions = createApiCallSaga({
  type: Types.GET_TRANSACTIONS,
  method: 'GET',
  path: function*() {
    console.log(yield roleBasedPath('transactions/'))
    return yield roleBasedPath('transactions/')
  },
  selectorKey: 'transactions',
  allowedParamKeys: ['page', 'page_size', 'period', 'from', 'to', 'team', 'type']
})

const getTransactionDetail = createApiCallSaga({
  type: Types.GET_TRANSACTION_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`transactions/${payload}/`)
  },
  selectorKey: 'transactionDetail'
})

//for download
const downloadTransactions = createApiCallSaga({
  type: Types.DOWNLOAD_TRANSACTIONS,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, `Transaction-${action.payload.fileName}.csv`)
    return null
  },
  path: function*() {
    return yield roleBasedPath(`downloads/report/transactions/`)
  },
  selectorKey: 'transactionDownload',
  allowedParamKeys: ['period', 'from', 'to', 'team', 'type']
})

const createTransaction = createApiCallSaga({
  type: Types.CREATE_TRANSACTION,
  method: 'POST',
  path: 'api/admin/transactions/',
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Transaction created successfully!'
      })
    )
  }
})

const updateTransaction = createApiCallSaga({
  type: Types.UPDATE_TRANSACTION,
  method: 'PUT',
  path: function*({ payload }) {
    return yield `api/admin/transactions/${payload.id}`
  }
})

const deleteTransaction = createApiCallSaga({
  type: Types.DELETE_TRANSACTION,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield `api/admin/transactions/${payload.id}`
  }
})

const deleteTransactionAndRefresh = function*(action) {
  console.log(action)
  const confirmed = yield confirm(action.payload.message)
  if (confirmed) {
    yield deleteTransaction(action)
    yield getTransactions({
      type: Types.GET_TRANSACTIONS
    })
  }
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_TRANSACTIONS, getTransactions)
  yield takeLatest(Types.GET_TRANSACTION_DETAIL, getTransactionDetail)
  yield takeLatest(Types.DOWNLOAD_TRANSACTIONS, downloadTransactions) //for download
  yield takeLatest(Types.CREATE_TRANSACTION, createTransaction)
  yield takeLatest(Types.DELETE_TRANSACTION_AND_REFRESH, deleteTransactionAndRefresh)
  yield takeLatest(Types.UPDATE_TRANSACTION, updateTransaction)
}
