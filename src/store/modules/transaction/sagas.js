import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { downloadFile, generateHrefFromText } from 'helpers/utils'

const getTransactions = createApiCallSaga({
  type: Types.GET_TRANSACTIONS,
  method: 'GET',
  path: function*() {
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
    downloadFile(href, `Transaction-${action.payload.teamOrUserName}.csv`)
    return null
  },
  path: function*() {
    return yield roleBasedPath(`downloads/report/transactions/`)
  },
  selectorKey: 'transactionDownload',
  allowedParamKeys: ['period', 'from', 'to', 'team']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_TRANSACTIONS, getTransactions)
  yield takeLatest(Types.GET_TRANSACTION_DETAIL, getTransactionDetail)

  //for download
  yield takeLatest(Types.DOWNLOAD_TRANSACTIONS, downloadTransactions)
}
