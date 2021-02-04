import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as users } from './users'
import { saga as teams } from './teams'
import { saga as profiles } from './profiles'
import { saga as accounts } from './accounts'
import { saga as clients } from './clients'
import { saga as partners } from './partners'
import { saga as project } from './project'
import { saga as dashboard } from './dashboard'

export default function* rootSaga() {
  yield all([auth(), users(), teams(), profiles(), accounts(), clients(), partners(), project(), dashboard()])
}
