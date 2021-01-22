import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'

const getClients = apiCallSaga({
  type: Types.GET_CLIENTS,
  method: 'GET',
  path: 'api/developer/clients/',
  selectorKey: 'clients'
})

const createClient = apiCallSaga({
  type: Types.CREATE_CLIENT,
  method: 'POST',
  path: 'api/developer/clients/'
})

const getClientDetail = apiCallSaga({
  type: Types.GET_CLIENT_DETAIL,
  method: 'GET',
  path: ({ payload }) => `api/developer/clients/${payload}/`,
  selectorKey: 'clientDetail'
})

const updateClient = apiCallSaga({
  type: Types.UPDATE_CLIENT,
  method: 'PUT',
  path: ({ payload: { id } }) => `api/developer/clients/${id}/`
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_CLIENTS, getClients)
  yield takeLatest(Types.CREATE_CLIENT, createClient)
  yield takeLatest(Types.GET_CLIENT_DETAIL, getClientDetail)
  yield takeLatest(Types.UPDATE_CLIENT, updateClient)
}
