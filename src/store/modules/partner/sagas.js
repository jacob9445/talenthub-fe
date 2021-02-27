import { put, takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { showMessage } from '../message'

const getPartners = apiCallSaga({
  type: Types.GET_PARTNERS,
  method: 'GET',
  path: function*() {
    return yield roleBasedPath('partners/')
  },
  selectorKey: 'partners',
  allowedParamKeys: ['page', 'page_size']
})

const deletePartner = apiCallSaga({
  type: Types.DELETE_PARTNER,
  method: 'DELETE',
  path: function*({ payload }) {
    return yield roleBasedPath(`partners/${payload.id}`)
  }
})

const deletePartnerAndRefresh = function*(action) {
  yield deletePartner(action)
  yield getPartners({
    payload: action.payload
  })
}

const getPartnerDetail = apiCallSaga({
  type: Types.GET_PARTNER_DETAIL,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`partners/${payload}`)
  },
  selectorKey: 'partnerDetail'
})

const updatePartnerDetail = apiCallSaga({
  type: Types.UPDATE_PARTNER_DETAIL,
  method: 'PUT',
  path: function*({ payload }) {
    return yield roleBasedPath(`partners/${payload.id}/`)
  }
})

const createPartner = apiCallSaga({
  type: Types.CREATE_PARTNER,
  method: 'POST',
  path: function*() {
    return yield roleBasedPath(`partners/`)
  },
  success: function*(resData) {
    yield put(
      showMessage({
        message: 'Partner created successfully!'
      })
    )
  }
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_PARTNERS, getPartners)
  yield takeLatest(Types.DELETE_PARTNER, deletePartner)
  yield takeLatest(Types.DELETE_PARTNER_AND_REFRESH, deletePartnerAndRefresh)
  yield takeLatest(Types.GET_PARTNER_DETAIL, getPartnerDetail)
  yield takeLatest(Types.UPDATE_PARTNER_DETAIL, updatePartnerDetail)
  yield takeLatest(Types.CREATE_PARTNER, createPartner)
}
