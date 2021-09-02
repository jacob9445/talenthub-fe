import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

import api from './api'
import auth from './auth'
import user from './user'
import team from './team'
import profile from './profile'
import account from './account'
import client from './client'
import message from './message'
import partner from './partner'
import project from './project'
import dashboard from './dashboard'
import financialRequest from './financialRequest'
import transaction from './transaction'
import individualReport from './individualReport'
import teamReport from './teamReport'
import notification from './notification'
import logging from './logging'

export default combineReducers({
  api,
  isAuthenticated: auth,
  user,
  team,
  profile,
  account,
  client,
  message,
  partner,
  project,
  dashboard,
  financialRequest,
  transaction,
  individualReport,
  teamReport,
  modal,
  logging,
  notification
})
