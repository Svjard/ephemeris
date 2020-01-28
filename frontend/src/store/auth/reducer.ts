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
    case AuthActionTypes.REFRESH: {
      return { ...state, loading: false, data: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as authReducer }