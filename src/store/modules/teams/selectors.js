import * as R from 'ramda'
import { dataSelector } from '../api'

export const teamsSelector = R.compose(
  R.path(['results']),
  dataSelector('teams')
)

export const teamMemberSelector = R.compose(
  R.path(['results']),
  dataSelector('teamMembers')
)