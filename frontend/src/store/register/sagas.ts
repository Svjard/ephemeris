import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { RegisterActionTypes } from './types'
import { registerError, registerSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.EPHEMERIS_API_ENDPOINT || 'https://api.ephemeris.xyz'

function* handleRegister() {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, '/auth/register')

    if (res.error) {
      yield put(registerError(res.error))
    } else {
      yield put(registerSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(registerError(err.stack))
    } else {
      yield put(registerError('An unknown error occured.'))
    }
  }
}

function* watchRegisterRequest() {
  yield takeEvery(RegisterActionTypes.REGISTER, handleRegister)
}

function* registerSaga() {
  yield all([fork(watchRegisterRequest)])
}

export default registerSaga