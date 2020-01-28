export type ApiResponse = Record<string, any>

export enum AuthActionTypes {
  CHECK = '@@auth/CHECK',
  REFRESH = '@@auth/REFRESH',
}

export interface AuthState {
  readonly loading: boolean
  readonly data: string|null
  readonly error?: string
}
