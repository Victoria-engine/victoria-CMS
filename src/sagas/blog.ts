import { takeLatest, put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { API_URL } from '../constants'
import { BLOG_ACTION_TYPES, getUserDataSuccess, getUserDataError } from '../reducers/blog'
import setAuthHeaders from '../utils/setAuthHeaders'


/** Worker to user speciic data */
function* getUserDataWorker() {
  try {
    const requestUrl = `${API_URL}/api/user/info`
    const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

    const { data } = yield call(request, requestUrl, {
      headers,
      method: 'GET',
    })

    yield put(getUserDataSuccess(data[0]))
  } catch (error) {
    yield put(getUserDataError(error))
  }
}

export default function* rootSaga() {
  yield takeLatest(BLOG_ACTION_TYPES.GET_USER_DATA, getUserDataWorker)
}

