/**
 * Import all REDUCERS here and export them for the store object
 */

import { combineReducers } from 'redux'
import auth from '../reducers/auth'

export default combineReducers({
  auth,
})
