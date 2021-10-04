import { takeLatest } from 'redux-saga/effects'
import { createApiCallSaga } from '../api'
import * as Types from './types'
import { roleBasedPath } from 'helpers/sagaHelpers'
import { downloadFile, generateHrefFromText } from 'helpers/utils'

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
const getSelfEarningReport = createApiCallSaga({
  type: Types.GET_SELF_EARNING_REPORT,
  method: 'GET',
  path: 'api/developer/report/earnings/earning/',
  selectorKey: 'selfEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

const getSelfProjectEarningReport = createApiCallSaga({
  type: Types.GET_SELF_PROJECT_EARNING_REPORT,
  method: 'GET',
  path: 'api/developer/report/earnings/project_earnings/',
  selectorKey: 'selfProjectEarning',
  allowedParamKeys: ['period', 'from', 'to']
})

//for download
const downloadDevelopersEarning = createApiCallSaga({
  type: Types.DOWNLOAD_DEVELOPERS_EARNING,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, `Report-${action.payload.teamName}.csv`)
    return null
  },
  path: function*() {
    return yield roleBasedPath(`downloads/report/developers/`)
  },
  selectorKey: 'developersEarningDownload',
  allowedParamKeys: ['period', 'from', 'to', 'team']
})

const downloadIndividualDeveloperEarning = createApiCallSaga({
  type: Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_EARNING,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, `${action.payload.developer}'s earning report.csv`)
    return null
  },
  path: function*({ payload }) {
    return yield roleBasedPath(`downloads/report/developers/${payload.developerId}/`)
  },
  selectorKey: 'individualDevelopersEarningDownload',
  allowedParamKeys: ['period', 'from', 'to']
})

const downloadIndividualDeveloperProjectsEarning = createApiCallSaga({
  type: Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_PROJECTS_EARNING,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, `${action.payload.developer}'s projects earning report.csv`)
    return null
  },
  path: function*({ payload }) {
    return yield roleBasedPath(`downloads/report/developers/${payload.developerId}/projects/`)
  },
  selectorKey: 'individualDevelopersProjectsEarningDownload',
  allowedParamKeys: ['period', 'from', 'to']
})

const downloadTeamsEarning = createApiCallSaga({
  type: Types.DOWNLOAD_TEAMS_EARNING,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, "Teams' earning report.csv")
    return null
  },
  path: function*({ payload }) {
    return yield roleBasedPath(`downloads/report/teams/`)
  },
  selectorKey: 'teamsEarningDownload',
  allowedParamKeys: ['period', 'from', 'to']
})

const downloadSelectedTeamEarning = createApiCallSaga({
  type: Types.DOWNLOAD_SELECTED_TEAM_EARNING,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, `Report-${action.payload.team}.csv`)
    return null
  },
  path: function*({ payload }) {
    return yield roleBasedPath(`downloads/report/teams/${payload.teamId}/`)
  },
  selectorKey: 'selectedTeamEarningDownload',
  allowedParamKeys: ['period', 'from', 'to']
})

const downloadMyReport = createApiCallSaga({
  type: Types.DOWNLOAD_MY_REPORT,
  method: 'GET',
  payloadOnSuccess: (resData, action) => {
    const href = generateHrefFromText(resData)
    downloadFile(href, 'My report.csv')
    return null
  },
  path: 'api/developer/downloads/report/projects/',
  selectorKey: 'myReportDownload',
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
  yield takeLatest(Types.GET_SELF_EARNING_REPORT, getSelfEarningReport)
  yield takeLatest(Types.GET_SELF_PROJECT_EARNING_REPORT, getSelfProjectEarningReport)

  //for download
  yield takeLatest(Types.DOWNLOAD_DEVELOPERS_EARNING, downloadDevelopersEarning)
  yield takeLatest(Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_EARNING, downloadIndividualDeveloperEarning)
  yield takeLatest(Types.DOWNLOAD_INDIVIDUAL_DEVELOPER_PROJECTS_EARNING, downloadIndividualDeveloperProjectsEarning)
  yield takeLatest(Types.DOWNLOAD_TEAMS_EARNING, downloadTeamsEarning)
  yield takeLatest(Types.DOWNLOAD_SELECTED_TEAM_EARNING, downloadSelectedTeamEarning)

  yield takeLatest(Types.DOWNLOAD_MY_REPORT, downloadMyReport)
}
