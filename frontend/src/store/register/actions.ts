import { action } from 'typesafe-actions'
import { RegisterActionTypes } from './types'

export const register = () => action(RegisterActionTypes.REGISTER)
export const registerSuccess = (data: string) => action(RegisterActionTypes.REGISTER_SUCCESS, data)
export const registerError = (message: string) => action(RegisterActionTypes.REGISTER_ERROR, message)
