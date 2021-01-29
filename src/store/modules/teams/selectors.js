import * as R from 'ramda'
import { createDataSelector } from '../api'

export const teamsSelector = R.compose(
  R.path(['results']),
  createDataSelector('teams')
)
