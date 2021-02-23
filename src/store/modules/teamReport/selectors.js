import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const teamReportSelector = R.compose(
  R.path(['results']),
  createDataSelector('teamReport')
)

export const teamReportLoadingSelector = state => isRequestPending('teamReport', 'GET')(state)
