export type ApiResponse = Record<string, any>

export enum ForgotActionTypes {
  FORGOT = '@@auth/FORGOT',
  FORGOT_SUCCESS = '@@auth/FORGOT_SUCCESS',
  FORGOT_ERROR = '@@auth/FORGOT_ERROR',
}

export interface ForgotState {
  readonly loading: boolean
  readonly data: string|null
  readonly error?: string
}
