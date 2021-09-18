import * as R from 'ramda'
import { createDataSelector, isRequestPending } from '../api'

export const teamsSelector = R.compose(R.path(['results']), createDataSelector('teams'))

export const teamDetailSelector = createDataSelector('teamDetail')
export const teamDetailLoadingSelector = state => isRequestPending('teamDetail', 'GET')(state)
export const createTeamMembersSelector = teamId => createDataSelector(`teamMembers_${teamId}`)
export const teamMemberSelector = (state, props) => createTeamMembersSelector(props.teamId)(state)
export const memberSelector = createDataSelector('member')
