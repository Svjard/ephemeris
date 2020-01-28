import { Reducer } from 'redux'
import { ForgotState, ForgotActionTypes } from './types'

export const initialState: ForgotState = {
  data: null,
  error: undefined,
  loading: false
}

const reducer: Reducer<ForgotState> = (state = initialState, action) => {
  switch (action.type) {
    case ForgotActionTypes.FORGOT: {
      return { ...state, loading: true }
    }
    case ForgotActionTypes.FORGOT_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ForgotActionTypes.FORGOT_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as forgotReducer }