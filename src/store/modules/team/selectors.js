import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const teamsSelector = R.compose(R.path(['results']), createDataSelector('teams'))

export const teamDetailSelector = createDataSelector('teamDetail')
export const teamDetailLoadingSelector = state => isRequestPending('teamDetail', 'GET')(state)
