import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { AuthActionTypes } from './types'
import { checkError, checkSuccess, verify, verifySuccess, verifyError } from './actions'
import { callApi } from '../../utils/api'

const API_ENDPOINT = process.env.EPHEMERIS_API_ENDPOINT || 'https://api.ephemeris.xyz'

function* handleCheck() {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, '/auth/check')

    if (res.error) {
      yield put(checkError(res.error))
    } else {
      yield put(checkSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(checkError(err.stack))
    } else {
      yield put(checkError('An unknown error occured.'))
    }
  }
}

function* handleVerify(action: ReturnType<typeof verify>) {
  try {
    const res = yield call(callApi, 'post', API_ENDPOINT, `/auth/verify/${action.payload}`)

    if (res.error) {
      yield put(verifyError(res.error))
    } else {
      yield put(verifySuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(verifyError(err.stack))
    } else {
      yield put(verifyError('An unknown error occured.'))
    }
  }
}

function* watchCheckRequest() {
  yield takeEvery(AuthActionTypes.CHECK, handleCheck)
}

function* watchVerifyRequest() {
  yield takeEvery(AuthActionTypes.VERIFY, handleVerify)
}

function* authSaga() {
  yield all([fork(watchCheckRequest),fork(watchVerifyRequest)])
}

export default authSaga