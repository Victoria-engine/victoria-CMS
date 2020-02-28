import produce from 'immer'
import { ReduxAction, AppStore } from '../types'

const initialState: AppStore = {
  error: null,
}

const appReducer = (state = initialState, { payload, type, error }: ReduxAction) => {
  return produce(state, (draft) => {
    return state
  })
}


export default appReducer