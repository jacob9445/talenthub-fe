import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getAccounts = apiCallSaga({
  type: Types.GET_ACCOUNTS,
  method: 'GET',
  path: 'api/admin/accounts/',
  selectorKey: 'accounts'
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_ACCOUNTS, getAccounts)
}
