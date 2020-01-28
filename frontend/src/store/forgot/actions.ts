import { action } from 'typesafe-actions'
import { ForgotActionTypes } from './types'

export const forgot = () => action(ForgotActionTypes.FORGOT)
export const forgotSuccess = (data: string) => action(ForgotActionTypes.FORGOT_SUCCESS, data)
export const forgotError = (message: string) => action(ForgotActionTypes.FORGOT_ERROR, message)
