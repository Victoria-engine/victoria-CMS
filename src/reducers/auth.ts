import produce from 'immer'
import { ReduxAction, AuthStore, ValueOf, LoginUserSuccessPayload, LoginserPayload, RegisterUserPayload } from '../types'
import { setCookie, getCookie, removeCookie } from '../utils/cookies'
import { ACCESS_TOKEN } from '../constants'
import { toaster } from 'evergreen-ui'

export const AUTH_ACTION_TYPES = {
  LOGIN_USER: 'Auth/LOGIN_USER',
  LOGIN_USER_SUCCESS: 'Auth/LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR: 'Auth/LOGIN_USER_ERROR',

  REGISTER_USER: 'Auth/REGISTER_USER',
  REGISTER_USER_SUCCESS: 'Auth/REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR: 'Auth/REGISTER_USER_ERROR',

  LOGOUT_USER: 'Auth/LOGOUT_USER',
}

const initialState: AuthStore = {
  authToken: getCookie('key'),
  blogKey: null,
  working: false,
  error: null,
  success: false,
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
        draft.blogKey = payload.blogID
        draft.authToken = payload['access_token']
        draft.success = true
        break
      case AUTH_ACTION_TYPES.REGISTER_USER_ERROR:
      case AUTH_ACTION_TYPES.LOGIN_USER_ERROR:
        draft.working = false
        draft.error = error.message
        draft.success = false
        break

      case AUTH_ACTION_TYPES.LOGOUT_USER:
        draft.blogKey = null
        draft.authToken = ''
        break

      default: return state
    }
  })
}

/**
 * Login user action
 */
export const loginUser = (payload: LoginserPayload) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER,
  payload,
})
export const loginUserSuccess = (payload: LoginUserSuccessPayload) => {
  setCookie(ACCESS_TOKEN, payload.access_token)

  return {
    type: AUTH_ACTION_TYPES.LOGIN_USER_SUCCESS,
    payload,
  }
}
export const loginUserError = (error: Error) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_ERROR,
  error,
})

/**
 * Register user action
 */
export const registerUser = (payload: RegisterUserPayload) => ({
  type: AUTH_ACTION_TYPES.REGISTER_USER,
  payload,
})
export const registerUserSuccess = (payload: LoginUserSuccessPayload) => {
  toaster.success('Your account was successfully created! You can login with it now!')
  return {
    type: AUTH_ACTION_TYPES.REGISTER_USER_SUCCESS,
    payload,
  }
}
export const registerUserError = (error: Error) => {
  toaster.danger(error.message || 'Register failed, please double check if all fields are type corretly')

  return {
    type: AUTH_ACTION_TYPES.REGISTER_USER_ERROR,
    error,
  }
}

/**
 * Logout user
 */
export const logoutUser = () => {
  const token = getCookie(ACCESS_TOKEN)

  //@FIXME: Only remove on success when connected to /revoke
  removeCookie(ACCESS_TOKEN)

  return {
    type: AUTH_ACTION_TYPES.LOGOUT_USER,
    token,
  }
}

export default authReducer