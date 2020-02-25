import produce from 'immer'
import { ReduxAction, $TS_FIXME } from '../types'

export const ACTION_TYPES = {
  LOGIN_USER: 'Auth/LOGIN_USER',
  LOGIN_USER_SUCCESS: 'Auth/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR: 'Auth/LOGIN_USER_ERROR',
}

const initialState = {
  authToken: null,
  blogData: {},
  working: false,
  error: '',
}

const authReducer = (state = initialState, { payload, type, error }: ReduxAction) => {
  return produce(state, (draft) => {
    const actionType = type as keyof typeof ACTION_TYPES

    switch (actionType) {
      case 'LOGIN_USER': 
        draft.working = true
        break
      case 'LOGIN_USER_SUCCESS': 
        draft.working = false
        draft.blogData = payload.blogData
        break
      case 'LOGIN_USER_ERROR': 
        draft.working = false
        draft.error = error
        break
      
      default: return state
    }
  })
}

/**
 * Login user action
 */
export const loginUser = (payload: $TS_FIXME) => ({
  type: ACTION_TYPES.LOGIN_USER,
  payload,
})
export const loginUserSuccess = (payload: $TS_FIXME) => ({
  type: ACTION_TYPES.LOGIN_USER_SUCCESS,
  payload,
})
export const loginUserError = (error: Error) => ({
  type: ACTION_TYPES.LOGIN_USER_ERROR,
  error,
})

export default authReducer