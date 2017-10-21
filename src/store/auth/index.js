import { handleActions } from 'redux-actions'
import { setAuthState } from './actions'

const initialState = {
  authenticated: false,
}

const reducer = handleActions({
  [setAuthState]: (state, action) => ({
    ...state,
    authenticated: action.payload,
  }),
}, initialState)

export const isLogged = state => state.auth.authenticated

export default reducer
