import produce from 'immer'
import {
  ReduxAction, BlogStore, GetUserDataSuccess, GetPostByIDPayload, GetPostByIDSuccessPayload, SavePostPayload, $TS_FIXME,
  CreateBlogPayload,
  BlogPost
} from '../types'
import { toaster } from 'evergreen-ui'
import safeJsonParse from '../utils/safeJsonParse'

export const BLOG_ACTION_TYPES = {
  GET_USER_DATA: 'Blog/GET_USER_DATA',
  GET_USER_DATA_SUCCESS: 'Blog/GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR: 'Blog/GET_USER_DATA_ERROR',

  GET_BLOG: 'Blog/GET_BLOG',
  GET_BLOG_SUCCESS: 'Blog/GET_BLOG_SUCCESS',
  GET_BLOG_ERROR: 'Blog/GET_BLOG_ERROR',

  GET_POST_BY_ID: 'Blog/GET_POST_BY_ID',
  GET_POST_BY_ID_SUCCESS: 'Blog/GET_POST_BY_ID_SUCCESS',
  GET_POST_BY_ID_ERROR: 'Blog/GET_POST_BY_ID_ERROR',

  SAVE_POST: 'Blog/SAVE_POST',
  SAVE_POST_SUCCESS: 'Blog/SAVE_POST_SUCCESS',
  SAVE_POST_ERROR: 'Blog/SAVE_POST_ERROR',

  DELETE_POST: 'Blog/DELETE_POST',
  DELETE_POST_SUCCESS: 'Blog/DELETE_POST_SUCCESS',
  DELETE_POST_ERROR: 'Blog/DELETE_POST_ERROR',

  TOGGLE_PUBLISH_POST: 'Blog/TOGGLE_PUBLISH_POST',
  TOGGLE_PUBLISH_POST_SUCCESS: 'Blog/TOGGLE_PUBLISH_POST_SUCCESS',
  TOGGLE_PUBLISH_POST_ERROR: 'Blog/TOGGLE_PUBLISH_POST_ERROR',

  CREATE_POST: 'Blog/CREATE_POST',
  CREATE_POST_SUCCESS: 'Blog/CREATE_POST_SUCCESS',
  CREATE_POST_ERROR: 'Blog/CREATE_POST_ERROR',

  CREATE_BLOG: 'Blog/CREATE_BLOG',
  CREATE_BLOG_SUCCESS: 'Blog/CREATE_BLOG_SUCCESS',
  CREATE_BLOG_ERROR: 'Blog/CREATE_BLOG_ERROR',

  GET_CONSUMER_KEY: 'Blog/GET_CONSUMER_KEY',
  GET_CONSUMER_KEY_SUCCESS: 'Blog/GET_CONSUMER_KEY_SUCCESS',
  GET_CONSUMER_KEY_ERROR: 'Blog/GET_CONSUMER_KEY_ERROR',

  GET_POSTS_LIST: 'Blog/GET_POSTS_LIST',
  GET_POSTS_LIST_SUCCESS: 'Blog/GET_POSTS_LIST_SUCCESS',
  GET_POSTS_LIST_ERROR: 'Blog/GET_POSTS_LIST_ERROR',
}

const initialState: BlogStore = {
  blog: {
    id: '',
    title: '',
    description: '',
    key: '',
    posts: [],
  },
  user: {
    name: '',
    email: '',
    created_at: '',
  },
  error: null,
  hasSavedSuccess: false,
  blogCreated: false,
  working: false,
  gotBlog: false,
  postDeletedID: '',
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
        const { blogID, ...userData } = payload
        draft.working = false
        draft.blog.id = blogID
        draft.user = userData
        break

      case BLOG_ACTION_TYPES.GET_BLOG:
        draft.working = true
        draft.gotBlog = true
        break
      case BLOG_ACTION_TYPES.GET_BLOG_SUCCESS:
        const { posts, ...blog } = payload

        draft.working = false
        draft.blog = blog
        draft.blog.posts = posts.map((p: BlogPost) =>
          ({
            ...p,
            text: typeof p.text === 'string' ? safeJsonParse(p.text) : p.text,
          }))
        draft.gotBlog = true
        break
      case BLOG_ACTION_TYPES.GET_BLOG_ERROR:
        draft.working = false
        draft.gotBlog = true
        draft.error = error.message
        break

      case BLOG_ACTION_TYPES.GET_POST_BY_ID_ERROR:
      case BLOG_ACTION_TYPES.GET_USER_DATA_ERROR:
        draft.working = false
        draft.error = error.message
        break

      case BLOG_ACTION_TYPES.GET_POST_BY_ID_SUCCESS:
        draft.working = false
        const idx = draft.blog.posts.findIndex(p => p.id === payload.id)

        if (idx < 0) {
          throw new Error(`found no post with ID of ${payload.id} to update.`)
        }

        const updatedPost = {
          ...payload,
          text: typeof payload.text === 'string' ? safeJsonParse(payload.text) : payload.text,
        }

        draft.blog.posts[idx] = updatedPost
        break

      case BLOG_ACTION_TYPES.CREATE_POST:
      case BLOG_ACTION_TYPES.SAVE_POST: {
        draft.hasSavedSuccess = false
        break
      }

      case BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST_SUCCESS:
      case BLOG_ACTION_TYPES.CREATE_POST_SUCCESS:
      case BLOG_ACTION_TYPES.SAVE_POST_SUCCESS: {
        const changedPostIndex = draft.blog.posts.findIndex((p) => p.id === payload.id)
        const updatedPost = {
          ...payload,
          text: typeof payload.text === 'string' ? safeJsonParse(payload.text) : payload.text,
        }

        draft.blog.posts[changedPostIndex] = updatedPost
        draft.hasSavedSuccess = true
        break
      }

      case BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST_ERROR:
      case BLOG_ACTION_TYPES.CREATE_POST_ERROR:
      case BLOG_ACTION_TYPES.SAVE_POST_ERROR: {
        draft.hasSavedSuccess = false
        break
      }

      case BLOG_ACTION_TYPES.CREATE_BLOG: {
        draft.working = false
        draft.blogCreated = false
        break
      }
      case BLOG_ACTION_TYPES.CREATE_BLOG_SUCCESS: {
        draft.blogCreated = true
        draft.blog = payload
        break
      }
      case BLOG_ACTION_TYPES.CREATE_BLOG_ERROR: {
        draft.blogCreated = false
        draft.error = error.message
        break
      }

      case BLOG_ACTION_TYPES.GET_CONSUMER_KEY: {
        draft.working = false
        break
      }
      case BLOG_ACTION_TYPES.GET_CONSUMER_KEY_SUCCESS: {
        draft.working = false
        draft.blog.key = payload
        break
      }
      case BLOG_ACTION_TYPES.GET_CONSUMER_KEY_ERROR: {
        draft.working = false
        draft.error = error.message
        break
      }

      case BLOG_ACTION_TYPES.GET_POSTS_LIST:
        draft.working = true
        draft.error = null
        break

      case BLOG_ACTION_TYPES.GET_POSTS_LIST_SUCCESS:
        draft.working = false
        draft.blog.posts = payload.map((p: BlogPost) =>
          ({
            ...p,
            text: typeof p.text === 'string' ? safeJsonParse(p.text) : p.text,
          }))
        draft.error = null
        break

      case BLOG_ACTION_TYPES.GET_POSTS_LIST_ERROR:
        draft.working = false
        draft.error = payload.message
        break

      case BLOG_ACTION_TYPES.DELETE_POST:
        draft.postDeletedID = ''
        break

      case BLOG_ACTION_TYPES.DELETE_POST_SUCCESS:
        draft.error = null
        draft.postDeletedID = payload.postID
        break

      case BLOG_ACTION_TYPES.DELETE_POST_ERROR:
        draft.error = payload.message
        draft.postDeletedID = ''
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
 * Get posts list
 */
export const getPostsList = (consumerKey: string) => ({
  type: BLOG_ACTION_TYPES.GET_POSTS_LIST,
  consumerKey,
})
export const getPostsListSuccess = (payload: BlogPost[]) => ({
  type: BLOG_ACTION_TYPES.GET_POSTS_LIST_SUCCESS,
  payload,
})
export const getPostsListError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.GET_POSTS_LIST_ERROR,
  error,
})

/**
 * Get blog action
 */
export const getBlog = (payload: { key: string }) => ({
  type: BLOG_ACTION_TYPES.GET_BLOG,
  ...payload,
})
export const getBlogSuccess = (payload: GetUserDataSuccess['blog']) => ({
  type: BLOG_ACTION_TYPES.GET_BLOG_SUCCESS,
  payload,
})
export const getBlogError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.GET_BLOG_ERROR,
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
 * 
 * Delete post
 */
export const deletePost = (postID: string) => ({
  type: BLOG_ACTION_TYPES.DELETE_POST,
  postID,
})
export const deletePostSuccess = (payload: { postID: string }) => {
  toaster.success('Post deleted successfully!')

  return {
    type: BLOG_ACTION_TYPES.DELETE_POST_SUCCESS,
    payload,
  }
}
export const deletePostError = (error: Error) => ({
  type: BLOG_ACTION_TYPES.DELETE_POST_ERROR,
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
 * Publish/Unpublish Post
 */
export const togglePublishPost = (payload: SavePostPayload) => ({
  type: BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST,
  ...payload,
})
export const togglePublishPostSuccess = (payload: $TS_FIXME) => {
  const newStateNotification = ['private', 'not-listed'].includes(payload.visibility) ? 'Unpublished' : 'Published'
  toaster.success(`Post has been ${newStateNotification} !`)

  return {
    type: BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST_SUCCESS,
    payload,
  }
}
export const togglePublishPostError = (error: Error) => {
  toaster.danger(error.message || 'Couldn\'t publish the post, please check if eveything is filled correctly.')

  return {
    type: BLOG_ACTION_TYPES.TOGGLE_PUBLISH_POST_ERROR,
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
export const createBlogError = (error: Error) => {
  toaster.danger(error.message || 'Couldn\'t create the blog, please check if eveything is filled correctly.')

  return {
    type: BLOG_ACTION_TYPES.CREATE_BLOG_ERROR,
    error,
  }
}

/**
 * Get consumer key
 */
export const getConsumerKey = () => ({
  type: BLOG_ACTION_TYPES.GET_CONSUMER_KEY,
})
export const getConsumerKeySuccess = (payload: string) => {
  return {
    type: BLOG_ACTION_TYPES.GET_CONSUMER_KEY_SUCCESS,
    payload,
  }
}
export const getConsumerKeyError = (error: Error) => {
  return {
    type: BLOG_ACTION_TYPES.GET_CONSUMER_KEY_ERROR,
    error,
  }
}

export default blogReducer