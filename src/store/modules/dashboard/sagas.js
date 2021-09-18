import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import { roleBasedPath } from 'helpers/sagaHelpers'
import * as Types from './types'

const getOngoingProjects = createApiCallSaga({
  type: Types.GET_ONGOING_PROJECTS,
  method: 'get',
  path: function*() {
    return yield roleBasedPath('dashboard/ongoing-projects/')
  },
  selectorKey: 'ongoing_projects',
  allowedParamKeys: ['team', 'user']
})

const getWeeklyIncome = createApiCallSaga({
  type: Types.GET_WEEKLY_INCONE,
  method: 'get',
  path: function*() {
    return yield roleBasedPath('dashboard/weekly-income/')
  },
  selectorKey: 'weekly_income',
  allowedParamKeys: ['team', 'user']
})

const getStats = createApiCallSaga({
  type: Types.GET_STATS,
  method: 'get',
  path: function*() {
    return yield roleBasedPath('dashboard/stats/')
  },
  selectorKey: 'stats',
  allowedParamKeys: ['team', 'user']
})

const getPendingRequests = createApiCallSaga({
  type: Types.GET_PENDING_REQUESTS,
  method: 'get',
  path: function*() {
    return yield roleBasedPath('dashboard/pending-requests/')
  },
  selectorKey: 'pending_requests',
  allowedParamKeys: ['team', 'user']
})

const getApprovedRequests = createApiCallSaga({
  type: Types.GET_APPROVED_REQUESTS,
  method: 'get',
  path: function*() {
    return yield roleBasedPath('dashboard/approved-requests/')
  },
  selectorKey: 'approved_requests',
  allowedParamKeys: ['team', 'user']
})

export default function* rootSaga() {
  yield takeLatest(Types.GET_ONGOING_PROJECTS, getOngoingProjects)
  yield takeLatest(Types.GET_WEEKLY_INCONE, getWeeklyIncome)
  yield takeLatest(Types.GET_STATS, getStats)
  yield takeLatest(Types.GET_PENDING_REQUESTS, getPendingRequests)
  yield takeLatest(Types.GET_APPROVED_REQUESTS, getApprovedRequests)
}
