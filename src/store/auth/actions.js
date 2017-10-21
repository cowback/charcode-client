import { createAction } from 'redux-actions'
import cookie from 'utils/cookie'

const setAuthState = createAction('SET_USER')

const login = credentials => (dispatch, _, api) => api.login(credentials)
  .then(({ token }) => {
    cookie.set('token', token)
    dispatch(setAuthState(true))
  })
  .catch(console.error)

const reauthenticate = () => (dispatch, _, api) => api.verifyToken()
  .then(() => dispatch(setAuthState(true)))
  .catch(console.error)

const createAccount = user => (dispatch, _, api) => api
  .createAccount(user)
  .then(() => dispatch(login(user)))
  .catch(console.error)

const logout = (phone) => dispatch => {
  dispatch(setAuthState(false))
  cookie.set('token', '')
}

export {
  reauthenticate,
  createAccount,
  setAuthState,
  login,
  logout
}
