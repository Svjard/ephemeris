import { action } from 'typesafe-actions'
import { AuthActionTypes } from './types'

export const check = () => action(AuthActionTypes.CHECK)
export const checkSuccess = (data: string) => action(AuthActionTypes.CHECK_SUCCESS, data)
export const checkError = (message: string) => action(AuthActionTypes.CHECK_ERROR, message)

export const verify = (verificationToken: string) => action(AuthActionTypes.VERIFY, verificationToken)
export const verifySuccess = (data: string) => action(AuthActionTypes.VERIFY_SUCCESS, data)
export const verifyError = (message: string) => action(AuthActionTypes.VERIFY_ERROR, message)
