import { takeLatest } from 'redux-saga/effects'
import { apiCallSaga } from '../api'
import * as Types from './types'
import { ROLES } from 'config/constants'

const getPartners = apiCallSaga({
  type: Types.PARTNERS_GETPARTNERS,
  method: 'GET',
  path: ({ payload }) => {
    if (payload.role === ROLES.ADMIN) return 'api/admin/partners/'
    else if (payload.role === ROLES.TEAM_MANAGER) return 'api/team-manager/partners/'
    else return 'api/developer/partners/'
    // console.log('test here', payload.role)
  },
  selectorKey: 'partners'
})

const deletePartner = apiCallSaga({
  type: Types.PARTNERS_DELETEPARTNER,
  method: 'DELETE',
  path: ({ payload }) => `api/developer/partners/${payload.id}/`
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
  path: ({ payload }) => `api/developer/partners/${payload}/`,
  selectorKey: 'partnerDetail'
})

const updatePartnerDetail = apiCallSaga({
  type: Types.UPDATE_PARTNER_DETAIL,
  method: 'PUT',
  path: ({ payload: { id } }) => `api/developer/partners/${id}/`
})

const createPartner = apiCallSaga({
  type: Types.CREATE_PARTNER,
  method: 'POST',
  path: 'api/developer/partners/'
})

export default function* rootSaga() {
  yield takeLatest(Types.PARTNERS_GETPARTNERS, getPartners)
  yield takeLatest(Types.PARTNERS_DELETEPARTNER, deletePartner)
  yield takeLatest(Types.PARTNERS_DELETE_PARTNER_AND_REFRESH, deletePartnerAndRefresh)
  yield takeLatest(Types.GET_PARTNER_DETAIL, getPartnerDetail)
  yield takeLatest(Types.UPDATE_PARTNER_DETAIL, updatePartnerDetail)
  yield takeLatest(Types.CREATE_PARTNER, createPartner)
}
