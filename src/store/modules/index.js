import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'

import api from './api'
import auth from './auth'
import users from './users'
import teams from './teams'
import profiles from './profiles'
import accounts from './accounts'
import clients from './clients'
import message from './message'
import partners from './partners'
import project from './project'
import dashboard from './dashboard'
import financialRequest from './financialRequest'

export default combineReducers({
  api,
  isAuthenticated: auth,
  users,
  teams,
  profiles,
  accounts,
  clients,
  message,
  partners,
  project,
  dashboard,
  financialRequest,
  modal
})
