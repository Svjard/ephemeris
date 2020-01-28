import { Reducer } from 'redux'
import { LoginState, LoginActionTypes } from './types'

export const initialState: LoginState = {
  data: null,
  error: undefined,
  loading: false
}

const reducer: Reducer<LoginState> = (state = initialState, action) => {
  switch (action.type) {
    case LoginActionTypes.LOGIN: {
      return { ...state, loading: true }
    }
    case LoginActionTypes.LOGIN_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case LoginActionTypes.LOGIN_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as loginReducer }