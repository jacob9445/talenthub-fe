import { createAction } from 'redux-actions'
import * as Types from './types'

export const hideMessage = createAction(Types.HIDE_MESSAGE)
export const showMessage = createAction(Types.SHOW_MESSAGE)
