import { takeLatest, put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { API_URL } from '../constants'
import { BLOG_ACTION_TYPES, getUserDataSuccess, getUserDataError } from '../reducers/blog'
import setAuthHeaders from '../utils/setAuthHeaders'
import { logoutUser } from '../reducers/auth'


/** Worker to user speciic data */
function* getUserDataWorker() {
  const requestUrl = `${API_URL}/api/user/info`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'GET',
  })

  if (error) {
     yield put(getUserDataError(error))
     yield put(logoutUser())
  }
  if (data && !error) yield put(getUserDataSuccess(data))
}

export default function* rootSaga() {
  yield takeLatest(BLOG_ACTION_TYPES.GET_USER_DATA, getUserDataWorker)
}

