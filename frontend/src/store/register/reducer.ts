import { Reducer } from 'redux'
import { RegisterState, RegisterActionTypes } from './types'

export const initialState: RegisterState = {
  data: null,
  error: undefined,
  loading: false
}

const reducer: Reducer<RegisterState> = (state = initialState, action) => {
  switch (action.type) {
    case RegisterActionTypes.REGISTER: {
      return { ...state, loading: true }
    }
    case RegisterActionTypes.REGISTER_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case RegisterActionTypes.REGISTER_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as registerReducer }