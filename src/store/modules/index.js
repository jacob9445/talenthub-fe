import { combineReducers } from 'redux'

import api from './api'
import auth from './auth'
import users from './users'

export default combineReducers({
  api,
  auth,
  users,
})
