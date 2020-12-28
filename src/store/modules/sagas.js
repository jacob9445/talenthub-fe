import { all } from 'redux-saga/effects'

import { saga as auth } from './auth'
import { saga as users} from './users'

export default function* rootSaga() {
  yield all([
    auth(),
    users(),
  ])
}
