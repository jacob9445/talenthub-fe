import * as R from 'ramda'
import { dataSelector } from '../api'
export const authSelector = R.path(['auth','profile'])
export const profileSelector = dataSelector('profile')