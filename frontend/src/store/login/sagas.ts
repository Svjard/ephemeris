import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { LoginActionTypes } from './types'
import { loginError, loginSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.EPHEMERIS_API_ENDPOINT || 'https://api.ephemeris.xyz'

function* handleLogin() {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, '/auth/login')

    if (res.error) {
      yield put(loginError(res.error))
    } else {
      yield put(loginSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(loginError(err.stack))
    } else {
      yield put(loginError('An unknown error occured.'))
    }
  }
}

function* watchLoginRequest() {
  yield takeEvery(LoginActionTypes.LOGIN, handleLogin)
}

function* loginSaga() {
  yield all([fork(watchLoginRequest)])
}

export default loginSaga