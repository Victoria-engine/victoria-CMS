import { takeLatest, put, call } from 'redux-saga/effects'
import request from '../utils/request'
import { API_URL } from '../constants'
import { BLOG_ACTION_TYPES, getUserDataSuccess, getUserDataError, getPostByIDSuccess, getPostByIDError, savePostError, savePostSuccess } from '../reducers/blog'
import setAuthHeaders from '../utils/setAuthHeaders'
import { logoutUser } from '../reducers/auth'
import { GetPostByIDPayload, SavePostPayload } from '../types'
import { AnyAction } from 'redux'


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

function* getPostByIDWorker({ postID }: GetPostByIDPayload & AnyAction) {
  const requestUrl = `${API_URL}/api/content/post/${postID}`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'GET',
  })

  if (error) {
     yield put(getPostByIDError(error))
  }
  if (data && !error) yield put(getPostByIDSuccess(data))
}

function* createOrEditPostWorker({ visibility, title, slug, html, description }: SavePostPayload & AnyAction) {
  const requestUrl = `${API_URL}/api/content/post`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify({ visibility, title, slug, html, description }),
  })

  if (error) {
     yield put(savePostError(error))
  }
  if (data && !error) yield put(savePostSuccess(data))
}

export default function* rootSaga() {
  yield takeLatest(BLOG_ACTION_TYPES.GET_USER_DATA, getUserDataWorker)
  yield takeLatest(BLOG_ACTION_TYPES.GET_POST_BY_ID, getPostByIDWorker)
  yield takeLatest(BLOG_ACTION_TYPES.SAVE_POST, createOrEditPostWorker)
}

