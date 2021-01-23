import * as R from 'ramda'

export const messageStateSelector = R.path(['message', 'state'])
export const messageOptionSelector = R.path(['message', 'options'])
