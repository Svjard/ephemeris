import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'

export const check = (data: string) => action(AuthActionTypes.CHECK, data)
export const refresh = (data: string) => action(AuthActionTypes.REFRESH, data)
