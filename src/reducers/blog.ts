import produce from 'immer'
import { ReduxAction, BlogStore, GetUserDataSuccess, GetPostByIDPayload, GetPostByIDSuccessPayload, SavePostPayload, $TS_FIXME } from '../types'

export const BLOG_ACTION_TYPES = {
  GET_USER_DATA: 'Blog/GET_USER_DATA',
  GET_USER_DATA_SUCCESS: 'Blog/GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR: 'Blog/GET_USER_DATA_ERROR',

  GET_POST_BY_ID: 'Blog/GET_POST_BY_ID',
  GET_POST_BY_ID_SUCCESS: 'Blog/GET_POST_BY_ID_SUCCESS',
  GET_POST_BY_ID_ERROR: 'Blog/GET_POST_BY_ID_ERROR',

  SAVE_POST: 'Blog/SAVE_POST',
  SAVE_POST_SUCCESS: 'Blog/SAVE_POST_SUCCESS',
  SAVE_POST_ERROR: 'Blog/SAVE_POST_ERROR',
}

const initialState: BlogStore = {
  working: false,
  blog: {
    name: '',
    description: '',
    author: '',
    key: '',
    posts: [],
  },
  user: {
    firstName: '',
    lastName: '',
    email: '',
    createdAt: '',
  },
  error: null,
}

const blogReducer = (state = initialState, { payload, type, error }: ReduxAction) => {
  return produce(state, (draft) => {
    const actionType = type as keyof typeof BLOG_ACTION_TYPES

    switch (actionType) {
      case BLOG_ACTION_TYPES.GET_POST_BY_ID:
      case BLOG_ACTION_TYPES.GET_USER_DATA: 
        draft.working = true
        break
      case BLOG_ACTION_TYPES.GET_USER_DATA_SUCCESS: 
        draft.working = false
        draft.blog = payload.blog[0]
        draft.user = payload.user
        break

      case BLOG_ACTION_TYPES.GET_POST_BY_ID_ERROR:
      case BLOG_ACTION_TYPES.GET_USER_DATA_ERROR: 
        draft.working = false
        draft.error = error.message
        break

      case BLOG_ACTION_TYPES.GET_POST_BY_ID_SUCCESS:
        draft.working = false
        const postToUpdate = draft.blog.posts.find(post => post._id === payload._id)

        if (postToUpdate) {
          const idx = draft.blog.posts.findIndex(post => post._id === payload._id)
          draft.blog.posts[idx] = payload
        } else {
          draft.blog.posts.unshift(payload)
        }

        break

      default: return state
    }
  })
}

/**
 * Get User data user action
 */
export const getUserData = () => ({
  type: BLOG_ACTION_TYPES.GET_USER_DATA,
})
export const getUserDataSuccess = (payload: GetUserDataSuccess) => ({
  type: BLOG_ACTION_TYPES.GET_USER_DATA_SUCCESS,
  payload,
})
export const getUserDataError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.GET_USER_DATA_ERROR,
  error,
})

/**
 * Get single post by ID
 */
export const getPostByID = (payload: GetPostByIDPayload) => ({
  type: BLOG_ACTION_TYPES.GET_POST_BY_ID,
  ...payload,
})
export const getPostByIDSuccess = (payload: GetPostByIDSuccessPayload) => ({
  type: BLOG_ACTION_TYPES.GET_POST_BY_ID_SUCCESS,
  payload,
})
export const getPostByIDError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.GET_POST_BY_ID_ERROR,
  error,
})

/**
 * Save post
 */
export const savePost = (payload: SavePostPayload) => ({
  type: BLOG_ACTION_TYPES.SAVE_POST,
  ...payload,
})
export const savePostSuccess = (payload: $TS_FIXME) => ({
  type: BLOG_ACTION_TYPES.SAVE_POST_SUCCESS,
  payload,
})
export const savePostError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.SAVE_POST_ERROR,
  error,
})

export default blogReducer