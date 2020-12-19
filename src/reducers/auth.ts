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

  LOGIN_USER_GOOGLE: 'Auth/LOGIN_USER_GOOGLE',
  LOGIN_USER_GOOGLE_SUCCESS: 'Auth/LOGIN_USER_GOOGLE_SUCCESS',
  LOGIN_USER_GOOGLE_ERROR: 'Auth/LOGIN_USER_GOOGLE_ERROR',

  DELETE_ACCOUNT: 'Auth/DELETE_ACCOUNT',
  DELETE_ACCOUNT_SUCCESS: 'Auth/DELETE_ACCOUNT_SUCCESS',
  DELETE_ACCOUNT_ERROR: 'Auth/DELETE_ACCOUNT_ERROR',
}

const initialState: AuthStore = {
  authToken: getCookie(ACCESS_TOKEN),
  working: false,
  error: null,
  success: false,
  accountDeleted: false,
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
        draft.authToken = ''
        draft.success = initialState.success
        break

      case AUTH_ACTION_TYPES.DELETE_ACCOUNT:
        draft.working = true
        draft.accountDeleted = false
        break
      case AUTH_ACTION_TYPES.DELETE_ACCOUNT_SUCCESS:
        draft.working = false
        draft.error = null
        draft.accountDeleted = true
        break
      case AUTH_ACTION_TYPES.DELETE_ACCOUNT_ERROR:
        draft.working = false
        draft.error = error.message
        draft.accountDeleted = false
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
export const loginUserError = (error: Error) => {
  const errorMessage = error.message ?? 'Please check if all the credentials are correctly typed'

  toaster.danger(errorMessage)

  return {
    type: AUTH_ACTION_TYPES.LOGIN_USER_ERROR,
    error,
  }
}

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

  // FIXME: Only remove on success when connected to /revoke
  removeCookie(ACCESS_TOKEN)

  return {
    type: AUTH_ACTION_TYPES.LOGOUT_USER,
    token,
  }
}

export const loginUserWithGoogle = (code: string) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_GOOGLE,
  code,
})
export const loginUserWithGoogleSuccess = (data: any) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_GOOGLE_SUCCESS,
  data,
})
export const loginUserWithGoogleError = (error: Error) => ({
  type: AUTH_ACTION_TYPES.LOGIN_USER_GOOGLE_ERROR,
  error,
})

export const deleteAccount = () => ({
  type: AUTH_ACTION_TYPES.DELETE_ACCOUNT,
})
export const deleteAccountSuccess = () => {
  toaster.success('Account', {
    description: 'Your account has been deleted!',
    hasCloseButton: true,
    duration: 5,
  })

  return {
    type: AUTH_ACTION_TYPES.DELETE_ACCOUNT_SUCCESS,
  }
}
export const deleteAccountError = (error: Error) => ({
  type: AUTH_ACTION_TYPES.DELETE_ACCOUNT_ERROR,
  error,
})

export default authReducer