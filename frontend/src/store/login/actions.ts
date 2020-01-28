import { action } from 'typesafe-actions'
import { LoginActionTypes, LoginToken } from './types'

export const login = () => action(LoginActionTypes.LOGIN)
export const loginSuccess = (data: LoginToken) => action(LoginActionTypes.LOGIN_SUCCESS, data)
export const loginError = (message: string) => action(LoginActionTypes.LOGIN_ERROR, message)
