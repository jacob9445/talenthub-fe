import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const individualReportSelector = R.compose(
  R.path(['results']),
  createDataSelector('individualReport')
)

export const individualReportLoadingSelector = state => isRequestPending('individualReport', 'GET')(state)
