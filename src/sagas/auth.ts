import { takeLatest, put, call } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import request from '../utils/request'
import { API_URL } from '../constants'
import { loginUserError, loginUserSuccess, AUTH_ACTION_TYPES } from '../reducers/auth'


/** Worker to login a user with the API */
function* loginUserWorker({ payload }: AnyAction) {

  try {
    const requestUrl = `${API_URL}/api/auth/login`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ credentials: payload.credentials })

    const { data } = yield call(request, requestUrl, {
      headers,
      method: 'POST',
      body,
    })

    yield put(loginUserSuccess(data))
  } catch (error) {
    yield put(loginUserError(error))
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER, loginUserWorker)
}

