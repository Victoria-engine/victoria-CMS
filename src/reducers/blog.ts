import produce from 'immer'
import { ReduxAction, BlogStore, GetUserDataSuccess } from '../types'

export const BLOG_ACTION_TYPES = {
  GET_USER_DATA: 'Auth/GET_USER_DATA',
  GET_USER_DATA_SUCCESS: 'Auth/GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR: 'Auth/GET_USER_DATA_ERROR',
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
  error: null,
}

const blogReducer = (state = initialState, { payload, type, error }: ReduxAction) => {
  return produce(state, (draft) => {
    const actionType = type as keyof typeof BLOG_ACTION_TYPES

    switch (actionType) {
      case BLOG_ACTION_TYPES.GET_USER_DATA: 
        draft.working = true
        break
      case BLOG_ACTION_TYPES.GET_USER_DATA_SUCCESS: 
        draft.working = false
        draft.blog = payload
        break
      case BLOG_ACTION_TYPES.GET_USER_DATA_ERROR: 
        draft.working = false
        draft.error = error
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

export default blogReducer