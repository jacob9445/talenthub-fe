import { put, takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getClients = apiCallSaga({
  type: Types.GET_CLIENTS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('clients/')
  },
  selectorKey: 'clients',
  allowedParamKeys: ['page', 'page_size']
})

const createClient = apiCallSaga({
  type: Types.CREATE_CLIENT,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`clients/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Client created successfully!'
      })
    )
  }
})

const getClientDetail = apiCallSaga({
  type: Types.GET_CLIENT_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`clients/${payload}`)
  },
  selectorKey: 'clientDetail'
})

const updateClient = apiCallSaga({
  type: Types.UPDATE_CLIENT,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`clients/${payload.id}/`)
  }
})

const deleteClient = apiCallSaga({
  type: Types.DELETE_CLIENT,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`clients/${payload}`)
  }
})

const deleteClientAndRefresh = function*(action) {
  yield deleteClient(action)
  yield getClients({
    type: Types.GET_CLIENTS
  })
}

export default function* rootSaga() {
  yield takeLatest(Types.GET_CLIENTS, getClients)
  yield takeLatest(Types.CREATE_CLIENT, createClient)
  yield takeLatest(Types.GET_CLIENT_DETAIL, getClientDetail)
  yield takeLatest(Types.UPDATE_CLIENT, updateClient)
  yield takeLatest(Types.DELETE_CLIENT_AND_REFRESH, deleteClientAndRefresh)
}
