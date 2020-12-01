import { takeLatest, put, call } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import request from '../utils/request'
import { API_URL } from '../constants'
import { loginUserError, loginUserSuccess, AUTH_ACTION_TYPES, registerUserSuccess, registerUserError } from '../reducers/auth'
import { LoginserPayload, RegisterUserPayload } from '../types'


/** Worker to login a user with the API */
function* loginUserWorker({ payload }: AnyAction & LoginserPayload) {
  const { email, password } = payload


  try {
    const requestUrl = `${API_URL}/auth/session`
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ email, password })

    const { data, error } = yield call(request, requestUrl, {
      headers,
      method: 'POST',
      body,
    })

    if (error) {
      yield put(loginUserError(error))
      return
    }

    yield put(loginUserSuccess(data))
  } catch (error) {
    yield put(loginUserError(error))
  }
}

/** Worker to register a user with the API */
function* registerUserWorker({ payload }: AnyAction & RegisterUserPayload) {
  const { email, password, name } = payload

  const requestUrl = `${API_URL}/auth/register`
  const headers = { 'Content-Type': 'application/json' }
  const body = JSON.stringify({ email, password, name })

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'POST',
    body,
  })

  if (error) {
    yield put(registerUserError(error))
  }

  if (data && !error) yield put(registerUserSuccess(data))
}

export default function* rootSaga() {
  yield takeLatest(AUTH_ACTION_TYPES.LOGIN_USER, loginUserWorker)
  yield takeLatest(AUTH_ACTION_TYPES.REGISTER_USER, registerUserWorker)
}

