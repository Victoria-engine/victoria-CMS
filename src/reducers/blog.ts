import produce from 'immer'
import { ReduxAction, BlogStore, GetUserDataSuccess, GetPostByIDPayload, GetPostByIDSuccessPayload, SavePostPayload, $TS_FIXME, CreateBlogPayload } from '../types'
import { toaster } from 'evergreen-ui'

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

  CREATE_POST: 'Blog/CREATE_POST',
  CREATE_POST_SUCCESS: 'Blog/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'Blog/CREATE_POST_ERROR',

  CREATE_BLOG: 'Blog/CREATE_BLOG',
  CREATE_BLOG_SUCCESS: 'Blog/CREATE_BLOG_SUCCESS',
  CREATE_BLOG_ERROR: 'Blog/CREATE_BLOG_ERROR',
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
  hasSavedSuccess: false,
  wasBlogCreated: false,
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
        draft.blog = payload.blog
        draft.user = payload.user
        draft.blog.posts = payload.posts
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

      case BLOG_ACTION_TYPES.CREATE_POST:
      case BLOG_ACTION_TYPES.SAVE_POST: {
        draft.hasSavedSuccess = false
        break
      }
      case BLOG_ACTION_TYPES.CREATE_POST_SUCCESS:
      case BLOG_ACTION_TYPES.SAVE_POST_SUCCESS: {
        draft.hasSavedSuccess = true
        break
      }
      case BLOG_ACTION_TYPES.CREATE_POST_ERROR:
      case BLOG_ACTION_TYPES.SAVE_POST_ERROR: {
        draft.hasSavedSuccess = false
        break
      }

      case BLOG_ACTION_TYPES.CREATE_BLOG: {
        draft.working = false
        draft.wasBlogCreated = false
        break
      }
      case BLOG_ACTION_TYPES.CREATE_BLOG_SUCCESS: {
        draft.wasBlogCreated = true
        draft.blog = payload.blog
        break
      }
      case BLOG_ACTION_TYPES.CREATE_BLOG_ERROR: {
        draft.wasBlogCreated = false
        draft.error = error.message
        break
      }

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
export const savePostSuccess = (payload: $TS_FIXME) => {
  toaster.success('Post saved with success!')

  return {
    type: BLOG_ACTION_TYPES.SAVE_POST_SUCCESS,
    payload,
  }
}
export const savePostError = (error: Error) => {
  toaster.danger(error.message || 'Couldn\'t save the post, please check if eveything is filled correctly.')

  return {
    type: BLOG_ACTION_TYPES.SAVE_POST_ERROR,
    error,
  }
}

/**
 * Create post
 */
export const createPost = (payload: SavePostPayload) => ({
  type: BLOG_ACTION_TYPES.CREATE_POST,
  ...payload,
})
export const createPostSuccess = (payload: $TS_FIXME) => {
  toaster.success('Post created with success!')

  return {
    type: BLOG_ACTION_TYPES.CREATE_POST_SUCCESS,
    payload,
  }
}
export const createPostError = (error: Error) => {
  toaster.danger(error.message || 'Couldn\'t save the post, please check if eveything is filled correctly.')

  return {
    type: BLOG_ACTION_TYPES.CREATE_POST_ERROR,
    error,
  }
}

/**
 * Create post
 */
export const createBlog = (payload: CreateBlogPayload) => ({
  type: BLOG_ACTION_TYPES.CREATE_BLOG,
  ...payload,
})
export const createBlogSuccess = (payload: $TS_FIXME) => {
  return {
    type: BLOG_ACTION_TYPES.CREATE_BLOG_SUCCESS,
    payload,
  }
}
export const ccreateBlogError = (error: Error) => {
  toaster.danger(error.message || 'Couldn\'t create the blog, please check if eveything is filled correctly.')

  return {
    type: BLOG_ACTION_TYPES.CREATE_BLOG_ERROR,
    error,
  }
}

export default blogReducer