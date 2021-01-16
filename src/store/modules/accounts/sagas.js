import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getAccounts = apiCallSaga({
  type: Types.GET_ACCOUNTS,
  method: 'GET',
  path: 'api/admin/accounts/',
  selectorKey: 'accounts'
})

const deleteAccount = apiCallSaga({
  typoe: Types.DELETE_ACCOUNT,
  method: 'DELETE',
  path: ({payload}) => `api/admin/accounts/${payload}/`,
})

const deleteAccountAndRefresh = function* (action) {
  yield deleteAccount(action)
  yield getAccounts({
    type: Types.GET_ACCOUNTS
  })
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_ACCOUNTS, getAccounts)
  yield takeLatest(Types.DELETE_ACCOUNT, deleteAccount)
  yield takeLatest(Types.DELETE_ACCOUNT_AND_REFRESH, deleteAccountAndRefresh)
}
