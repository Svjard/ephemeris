export type ApiResponse = Record<string, any>

export enum RegisterActionTypes {
  REGISTER = '@@auth/REGISTER',
  REGISTER_SUCCESS = '@@auth/REGISTER_SUCCESS',
  REGISTER_ERROR = '@@auth/REGISTER_ERROR',
}

export interface RegisterState {
  readonly loading: boolean
  readonly data: string|null
  readonly error?: string
}
