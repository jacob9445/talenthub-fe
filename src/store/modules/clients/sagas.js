import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import  * as Types from './types'

const getClients = apiCallSaga({
  type: Types.GET_CLIENTS,
  method: 'GET',
  path: 'api/developers/clients/',
  selectorKey: 'clients'
})

const createClient = apiCallSaga({
  type: Types.CREATE_CLIENT,
  method: 'POST',
  path: 'api/developers/clients/'
})


export default function* rootSaga() {
  yield takeLatest(Types.GET_CLIENTS, getClients)
  yield takeLatest(Types.CREATE_CLIENT, createClient)
}
