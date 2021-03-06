import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as user } from './user'
import { saga as team } from './team'
import { saga as profile } from './profile'
import { saga as account } from './account'
import { saga as client } from './client'
import { saga as partner } from './partner'
import { saga as project } from './project'
import { saga as dashboard } from './dashboard'
import { saga as financialRequest } from './financialRequest'
import { saga as transaction } from './transaction'
import { saga as report } from './report'
import { saga as notification } from './notification'
import { saga as logging } from './logging'
import { saga as myLogs } from './mylogs'
import { saga as paymentAccount } from './paymentAccount'
import { saga as platform } from './platform'

export default function* rootSaga() {
  yield all([
    auth(),
    user(),
    team(),
    profile(),
    account(),
    client(),
    partner(),
    project(),
    dashboard(),
    financialRequest(),
    transaction(),
    logging(),
    notification(),
    myLogs(),
    report(),
    paymentAccount(),
    platform()
  ])
}
