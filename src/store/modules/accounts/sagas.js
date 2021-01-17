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
  type: Types.DELETE_ACCOUNT,
  method: 'DELETE',
  path: ({payload}) => `api/admin/accounts/${payload}/`,
})

const deleteAccountAndRefresh = function* (action) {
  yield deleteAccount(action)
  yield getAccounts({
    type: Types.GET_ACCOUNTS
  })
}

const getAccountDetail = apiCallSaga({
  type: Types.GET_ACCOUNTDETAIL,
  method: 'GET',
  path: ({payload}) => `api/admin/accounts/${payload}/`,
  selectorKey: 'accountDetail'
})

const updateAccount = apiCallSaga({
  type: Types.GET_ACCOUNTDETAIL,
  method: 'PUT',
  path: ({payload:{id}}) => `api/admin/accounts/${id}/`
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_ACCOUNTS, getAccounts)
  yield takeLatest(Types.DELETE_ACCOUNT, deleteAccount)
  yield takeLatest(Types.DELETE_ACCOUNT_AND_REFRESH, deleteAccountAndRefresh)
  yield takeLatest(Types.GET_ACCOUNTDETAIL, getAccountDetail)
  yield takeLatest(Types.UPDATE_ACCOUNT, updateAccount)
}
