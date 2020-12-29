import { Middleware } from 'redux'
import { logoutUser } from '../reducers/auth'


const tokenVerificationMiddleware: Middleware = (store) => (next) => (action) => {
  const errorMessage = action?.error?.message
  const hasExpiredToken = errorMessage === 'expired_token'
  if (hasExpiredToken) {
    store.dispatch(logoutUser())
  }

  next(action)
}

export default tokenVerificationMiddleware