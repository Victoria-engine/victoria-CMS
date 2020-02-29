/**
 * Import all SAGAS here and export them for the saga middleware
 */
import authSaga from '../sagas/auth'
import blogSaga from '../sagas/blog'

const sagas = [
  authSaga,
  blogSaga,
]

export default sagas
