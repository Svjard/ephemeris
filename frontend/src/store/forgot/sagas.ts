import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { ForgotActionTypes } from './types'
import { forgotError, forgotSuccess } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.EPHEMERIS_API_ENDPOINT || 'https://api.ephemeris.xyz'

function* handleForgot() {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, '/auth/forgot-password')

    if (res.error) {
      yield put(forgotError(res.error))
    } else {
      yield put(forgotSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(forgotError(err.stack))
    } else {
      yield put(forgotError('An unknown error occured.'))
    }
  }
}

function* watchForgotRequest() {
  yield takeEvery(ForgotActionTypes.FORGOT, handleForgot)
}

function* forgotSaga() {
  yield all([fork(watchForgotRequest)])
}

export default forgotSaga