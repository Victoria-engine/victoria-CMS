import produce from 'immer'
import { ReduxAction, $TS_FIXME, AuthStore, ValueOf } from '../types'

export const AUTH_ACTION_TYPES = {
  LOGIN_USER: 'Auth/LOGIN_USER',
  LOGIN_USER_SUCCESS: 'Auth/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR: 'Auth/LOGIN_USER_ERROR',
}

const initialState: AuthStore = {
  authToken: null,
  loggedInUserID: '',
  working: false,
  error: null,
}

const authReducer = (state = initialState, { payload, type, error }: ReduxAction) => {
  return produce(state, (draft) => {
    const actionType = type as ValueOf<typeof AUTH_ACTION_TYPES>

    switch (actionType) {
      case AUTH_ACTION_TYPES.LOGIN_USER: 
        draft.working = true
        break
      case AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS: 
        draft.working = false
        draft.loggedInUserID = payload.id
        draft.authToken = payload['access_token']
        break
      case AUTH_ACTION_TYPES.LOGIN_USER_ERROR: 
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
  type: AUTH_ACTION_TYPES.LOGIN_USER,
  payload,
})
export const loginUserSuccess = (payload: $TS_FIXME) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS,
  payload,
})
export const loginUserError = (error: Error) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_ERROR,
  error,
})

export default authReducer