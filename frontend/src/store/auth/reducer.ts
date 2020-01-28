import { Reducer } from 'redux'
import { AuthState, AuthActionTypes } from './types'

export const initialState: AuthState = {
  data: null,
  error: undefined,
  loading: false
}

const reducer: Reducer<AuthState> = (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.CHECK: {
      return { ...state, loading: true }
    }
    case AuthActionTypes.CHECK_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case AuthActionTypes.CHECK_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    case AuthActionTypes.VERIFY: {
      return { ...state, loading: true }
    }
    case AuthActionTypes.VERIFY_SUCCESS: {
      return { ...state, loading: false }
    }
    case AuthActionTypes.VERIFY_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as authReducer }