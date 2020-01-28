export interface LoginToken extends ApiResponse {
  jwtToken: string
}

export type ApiResponse = Record<string, any>

export enum LoginActionTypes {
  LOGIN = '@@auth/LOGIN',
  LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS',
  LOGIN_ERROR = '@@auth/LOGIN_ERROR',
}

export interface LoginState {
  readonly loading: boolean
  readonly data: LoginToken|null
  readonly error?: string
}
