/**
 * Import all REDUCERS here and export them for the store object
 */

import { combineReducers } from 'redux'
import app from '../reducers/app'
import auth from '../reducers/auth'
import blog from '../reducers/blog'

export default combineReducers({
  app,
  auth,
  blog,
})
