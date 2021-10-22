import { put, takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath, confirm } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getAccounts = createApiCallSaga({
  type: Types.GET_ACCOUNTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('accounts/')
  },
  selectorKey: 'accounts',
  allowedParamKeys: ['page', 'page_size', 'search']
})

const deleteAccount = createApiCallSaga({
  type: Types.DELETE_ACCOUNT,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`accounts/${payload.id}/`)
  }
})

const deleteAccountAndRefresh = function*(action) {
  const confirmed = yield confirm(action.payload.message)
  if (!confirmed) return

  yield deleteAccount(action)
  yield getAccounts({
    type: Types.GET_ACCOUNTS
  })
}

const getAccountDetail = createApiCallSaga({
  type: Types.GET_ACCOUNTDETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`accounts/${payload}/`)
  },
  selectorKey: 'accountDetail'
})

const updateAccount = createApiCallSaga({
  type: Types.GET_ACCOUNTDETAIL,
  method: 'PUT',
  path: function*({ payload: { id } }) {
    return yield roleBasedPath(`accounts/${id}/`)
  }
})

const createAccount = createApiCallSaga({
  type: Types.CREATE_ACCOUNT,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`accounts/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Account created successfully!'
      })
    )
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_ACCOUNTS, getAccounts)
  yield takeLatest(Types.DELETE_ACCOUNT, deleteAccount)
  yield takeLatest(Types.DELETE_ACCOUNT_AND_REFRESH, deleteAccountAndRefresh)
  yield takeLatest(Types.GET_ACCOUNTDETAIL, getAccountDetail)
  yield takeLatest(Types.UPDATE_ACCOUNT, updateAccount)
  yield takeLatest(Types.CREATE_ACCOUNT, createAccount)
}
