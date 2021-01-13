import * as R from 'ramda'
import { dataSelector } from '../api'

export const teamsSelector = R.compose(
  R.path(['results']),
  dataSelector('teams')
)
