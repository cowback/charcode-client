import { handleActions } from 'redux-actions'
import { setUser } from './actions'

const initialState = {
  authenticated: false,
  user: null
}

const reducer = handleActions({
  [setUser]: (state, action) => ({
    ...state,
    user: action.payload,
    authenticated: !!action.payload,
  }),
}, initialState)

export const isLogged = state => state.auth.authenticated

export default reducer
