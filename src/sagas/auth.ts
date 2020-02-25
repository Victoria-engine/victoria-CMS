import { takeLatest, put, call } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import request from '../utils/request'
import { API_URL } from '../constants'
import { loginUserError, loginUserSuccess, ACTION_TYPES } from '../reducers/auth'


/** Worker to login a user with the API */
function * loginUserWorker ({ payload }: AnyAction) {
  console.log(payload)
    const requestUrl = `${API_URL}/api/auth/login`
    console.log(requestUrl)
    const headers = { 'Content-Type': 'application/json' }
    const body = JSON.stringify({ credentials: payload.credentials })

    const { data, error } = yield call(request, requestUrl, {
      headers,
      method: 'POST',
      body,
    })

    console.log(data)

    if (!error) {
      yield put(loginUserSuccess(data))
    } else {
      yield put(loginUserError(error))
    }
}

// /** auto logins an account with jwt token */
// function* autoLogin({ token }: AnyAction) {
//   const requestUrl = `${API_URL}/auth/login/token`
//   const headers = { 'Content-Type': 'application/json' }
//   const body = JSON.stringify({ token })

//   const { data, error } = yield call(request, requestUrl, {
//     headers,
//     method: 'POST',
//     body,
//   })

//   if (!error) {
//     yield put(autoLoginSuccess({ ...data, token }))
//   } else {
//     yield put(autoLoginError(error))
//   }
// }

export default function* rootSaga() {
  yield takeLatest(ACTION_TYPES.LOGIN_USER, loginUserWorker)
  //yield takeLatest(AUTO_LOGIN, autoLogin)
}

