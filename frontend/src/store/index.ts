import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import authSaga from './auth/sagas'
import { authReducer } from './auth/reducer'
import { AuthState } from './auth/types'
import loginSaga from './login/sagas'
import { loginReducer } from './login/reducer'
import { LoginState } from './login/types'
import registerSaga from './register/sagas'
import { registerReducer } from './register/reducer'
import { RegisterState } from './register/types'
import forgotSaga from './forgot/sagas'
import { forgotReducer } from './forgot/reducer'
import { ForgotState } from './forgot/types'

export interface ApplicationState {
  router: RouterState
  auth: AuthState
  login: LoginState
  register: RegisterState
  forgot: ForgotState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    login: loginReducer,
    register: registerReducer,
    forgot: forgotReducer,
  })

export function* rootSaga() {
  yield all([fork(authSaga),fork(loginSaga),fork(registerSaga),fork(forgotSaga)])
}
