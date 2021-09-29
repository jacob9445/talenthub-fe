import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'

//for only admins
const getTeamsEarningReport = createApiCallSaga({
  type: Types.GET_TEAMS_EARNING_REPORT,
  method: 'GET',
  path: 'api/admin/report/earnings/teams/',
  selectorKey: 'teamsEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

const getSelectedTeamEarningReport = createApiCallSaga({
  type: Types.GET_SELECTED_TEAM_EARNING_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield `api/admin/report/earnings/teams/${payload.teamId}/`
  },
  selectorKey: 'selectedTeamEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

//for both admins and team-managers
const getTotalEarningReport = createApiCallSaga({
  type: Types.GET_TOTAL_EARNING_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`report/earnings/total/`)
  },
  selectorKey: 'totalEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

const getDevelopersEarningReport = createApiCallSaga({
  type: Types.GET_DEVELOPERS_EARNING_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`report/earnings/developers/`)
  },
  selectorKey: 'developersEarning',
  allowedParamKeys: ['page', 'page_size', 'period', 'from', 'to', 'team']
})

const getIndividualDeveloperEarningReport = createApiCallSaga({
  type: Types.GET_INDIVIDUAL_DEVELOPER_EARNING_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`report/earnings/developers/${payload.developerId}/`)
  },
  selectorKey: 'individualDeveloperEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

const getIndividualDeveloperProjectEarningReport = createApiCallSaga({
  type: Types.GET_INDIVIDUAL_DEVELOPER_PROJECT_EARNING_REPORT,
  method: 'GET',
  path: function*({ payload }) {
    return yield roleBasedPath(`report/earnings/developers/${payload.developerId}/projects/`)
  },
  selectorKey: 'individualDeveloperProjectEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

//for only developers
const getSelfFinancialReport = createApiCallSaga({
  type: Types.GET_SELF_FINANCIAL_REPORT,
  method: 'GET',
  path: 'api/developer/report/earnings/',
  selectorKey: 'selfFinancialReport',
  allowedParamKeys: ['period', 'from', 'to']
})

export default function* rootSaga() {
  //for only admins
  yield takeLatest(Types.GET_TEAMS_EARNING_REPORT, getTeamsEarningReport)
  yield takeLatest(Types.GET_SELECTED_TEAM_EARNING_REPORT, getSelectedTeamEarningReport)
  //for both admins and team-managers
  yield takeLatest(Types.GET_TOTAL_EARNING_REPORT, getTotalEarningReport)
  yield takeLatest(Types.GET_DEVELOPERS_EARNING_REPORT, getDevelopersEarningReport)
  yield takeLatest(Types.GET_INDIVIDUAL_DEVELOPER_EARNING_REPORT, getIndividualDeveloperEarningReport)
  yield takeLatest(Types.GET_INDIVIDUAL_DEVELOPER_PROJECT_EARNING_REPORT, getIndividualDeveloperProjectEarningReport)
  //for only developers
  yield takeLatest(Types.GET_SELF_FINANCIAL_REPORT, getSelfFinancialReport)
}
