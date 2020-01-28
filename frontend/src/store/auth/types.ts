export interface User extends ApiResponse {
  email: string
  firstName: string
  lastName: string
}

export type ApiResponse = Record<string, any>

export enum AuthActionTypes {
  CHECK = '@@auth/CHECK',
  CHECK_SUCCESS = '@@auth/CHECK_SUCCESS',
  CHECK_ERROR = '@@auth/CHECK_ERROR',
  VERIFY = '@@auth/VERIFY',
  VERIFY_SUCCESS = '@@auth/VERIFY_SUCCESS',
  VERIFY_ERROR = '@@auth/VERIFY_ERROR',
}

export interface AuthState {
  readonly loading: boolean
  readonly data: User|null
  readonly error?: string
}
