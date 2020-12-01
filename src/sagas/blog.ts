import { takeLatest, put, call, select } from 'redux-saga/effects'
import request from '../utils/request'
import { API_URL } from '../constants'
import {
  BLOG_ACTION_TYPES, getUserDataSuccess, getUserDataError, getPostByIDSuccess, getPostByIDError, savePostError, savePostSuccess,
  createPostError, createPostSuccess, createBlogError, createBlogSuccess, togglePublishPostError, togglePublishPostSuccess,
  getConsumerKeyError, getConsumerKeySuccess, getBlog, getBlogSuccess, getBlogError, getConsumerKey
} from '../reducers/blog'
import setAuthHeaders from '../utils/setAuthHeaders'
import { logoutUser } from '../reducers/auth'
import { GetPostByIDPayload, SavePostPayload, CreateBlogPayload, Store } from '../types'
import { AnyAction } from 'redux'


function* getUserDataWorker() {
  const requestUrl = `${API_URL}/user`
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

function* getBlogWorker({ key }: AnyAction) {
  const requestUrl = `${API_URL}/blog?key=${key}`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'GET',
  })

  if (error) {
    yield put(getBlogError(error))
    yield put(logoutUser())
  }
  if (data && !error) {
    yield put(getBlogSuccess({ ...data, key }))
  }
}

function* getPostByIDWorker({ postID }: GetPostByIDPayload & AnyAction) {
  const { blog }: Store = yield select()

  const consumerKey = blog.blog.key
  if (!consumerKey) {
    console.warn('No consumer key found when trying to fetch post')
    return
  }

  const requestUrl = `${API_URL}/post/${postID}?key=${consumerKey}`
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

function* createPostWorker({ visibility, title, text, description }: SavePostPayload & AnyAction) {
  const requestUrl = `${API_URL}/post`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      visibility,
      title,
      text: JSON.stringify(text),
      description
    }),
  })

  if (error) {
    yield put(createPostError(error))
  }
  if (data && !error) yield put(createPostSuccess(data))
}

function* savePostWorker({ visibility, title, text, description, id }: SavePostPayload & AnyAction) {
  const requestUrl = `${API_URL}/post/${id}`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'PATCH',
    body: JSON.stringify({ id, visibility, title, text, description }),
  })

  if (error) {
    yield put(savePostError(error))
  }
  if (data && !error) yield put(savePostSuccess(data))
}

function* togglePublishPostWorker({ visibility, id }: SavePostPayload & AnyAction) {
  const requestUrl = `${API_URL}/post/${id}`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'PATCH',
    body: JSON.stringify({ id, visibility }),
  })

  if (error) {
    yield put(togglePublishPostError(error))
  }
  if (data && !error) yield put(togglePublishPostSuccess(data))
}

function* createBlogWorker({ title, description }: CreateBlogPayload & AnyAction) {
  const requestUrl = `${API_URL}/blog`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'POST',
    body: JSON.stringify({ title, description }),
  })

  if (error) {
    yield put(createBlogError(error))
  }
  if (data && !error) yield put(createBlogSuccess(data))
}

function* getConsumerKeyWorker() {
  const requestUrl = `${API_URL}/blog/key`
  const headers = { 'Content-Type': 'application/json', ...setAuthHeaders() }

  const { data, error } = yield call(request, requestUrl, {
    headers,
    method: 'GET',
  })

  if (error) {
    yield put(getConsumerKeyError(error))
  }
  if (data && !error) {
    yield put(getConsumerKeySuccess(data))
    yield put(getBlog({ key: data }))
  }
}

export default function* rootSaga() {
  yield takeLatest(BLOG_ACTION_TYPES.GET_USER_DATA, getUserDataWorker)
  yield takeLatest(BLOG_ACTION_TYPES.GET_BLOG, getBlogWorker)
  yield takeLatest(BLOG_ACTION_TYPES.GET_POST_BY_ID, getPostByIDWorker)
  yield takeLatest(BLOG_ACTION_TYPES.CREATE_POST, createPostWorker)
  yield takeLatest(BLOG_ACTION_TYPES.SAVE_POST, savePostWorker)
  yield takeLatest(BLOG_ACTION_TYPES.CREATE_BLOG, createBlogWorker)
  yield takeLatest(BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST, togglePublishPostWorker)
  yield takeLatest(BLOG_ACTION_TYPES.GET_CONSUMER_KEY, getConsumerKeyWorker)
}

