import { handleActions } from 'redux-actions'
import { setStatus } from './actions'

const initialState = {
  status: 'ok',
  message: ''
}

const reducer = handleActions({
  [setStatus]: (state, action) => ({
    ...state,
    status: action.payload.status,
    message: action.payload.message
  }),
}, initialState)

export const status = state => state.status.status ? state.status.status : initialState.status
export const message = state => state.status.message ? state.status.message : initialState.message

// const initialState = {
//   authenticated: false,
// }
//
// const reducer = handleActions({
//   [setAuthState]: (state, action) => ({
//     ...state,
//     authenticated: action.payload,
//   }),
// }, initialState)
//
// export const isLogged = state => state.auth.authenticated

export default reducer
